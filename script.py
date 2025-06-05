import requests
import json
import time
from datetime import datetime
from typing import List, Dict, Optional
import urllib.parse

# Your existing book data
books_data = [
    {
        "title": "Above All Things",
        "author": "Roslyn Sinclair",
        "genres": ["romance"],
        "tags": ["wlw-romance", "Carlisle #2"],
        "rating": 4.53,
        "dateAdded": "2022-06-19"
    },
    {
        "title": "Chaos Agent", 
        "author": "Lee Winter",
        "genres": ["romance"],
        "tags": ["wlw-romance", "The Villains series"],
        "rating": 4.47,
        "dateAdded": "2023-07-30"
    },
    {
        "title": "The Snowball Effect",
        "author": "Haley Cass", 
        "genres": ["romance"],
        "tags": ["wlw-romance"],
        "rating": 4.46,
        "dateAdded": "2024-11-08"
    },
    {
        "title": "A Whisper of Solace",
        "author": "Milena McKay",
        "genres": ["romance"],
        "tags": ["wlw-romance"],
        "rating": 4.44,
        "dateAdded": "2022-06-25"
    },
    {
        "title": "Vengeance Planning for Amateurs",
        "author": "Lee Winter",
        "genres": ["romance"],
        "tags": ["wlw-romance"],
        "rating": 4.43,
        "dateAdded": "2024-11-21"
    },
    {
        "title": "Honey in the Marrow",
        "author": "Emily Waters",
        "genres": ["romance"],
        "tags": ["wlw-romance"],
        "rating": 4.41,
        "dateAdded": "2024-01-14"
    }
]

def get_work_details(work_key: str) -> Optional[Dict]:
    """
    Get detailed information from OpenLibrary works endpoint
    """
    if not work_key.startswith('/works/'):
        return None
        
    url = f"https://openlibrary.org{work_key}.json"
    
    try:
        print(f"  Fetching work details from: {work_key}")
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        
        work_data = response.json()
        
        # Extract description (can be string or dict with 'value' key)
        description = ""
        if 'description' in work_data:
            desc = work_data['description']
            if isinstance(desc, dict) and 'value' in desc:
                description = desc['value']
            elif isinstance(desc, str):
                description = desc
        
        # Get subjects for additional genre/tag information
        subjects = work_data.get('subjects', [])
        
        return {
            'description': description,
            'subjects': subjects,
            'work_key': work_key
        }
        
    except requests.RequestException as e:
        print(f"  Error fetching work details: {e}")
        return None

def search_open_library(title: str, author: str) -> Optional[Dict]:
    """
    Search OpenLibrary for a book and return the best match with description and cover
    """
    # Format author name (remove comma formatting)
    author_formatted = author.replace(", ", " ").strip()
    
    # Create search query
    query = f"{title} {author_formatted}"
    encoded_query = urllib.parse.quote_plus(query)
    
    url = f"https://openlibrary.org/search.json?q={encoded_query}&limit=5"
    
    try:
        print(f"Searching for: {title} by {author}")
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        
        data = response.json()
        
        if not data.get('docs'):
            print(f"  No results found")
            return None
            
        # Find the best match (first result is usually most relevant)
        for doc in data['docs']:
            print("Found", doc)
            # Check if we have a reasonable match
            doc_title = doc.get('title', '').lower()
            print("doc title", doc_title, "title", title)
            doc_authors = [author.lower() for author in doc.get('author_name', [])]
            
            print("title.lower() in doc_title", title.lower(), title.lower() in doc_title)
            
            
            if (title.lower() in doc_title or doc_title in title.lower()) and \
               any(author_formatted.lower() in doc_author or doc_author in author_formatted.lower() 
                   for doc_author in doc_authors):
                
                # Get description from first_sentence or description
                description = ""
                if 'first_sentence' in doc and doc['first_sentence']:
                    description = doc['first_sentence'][0] if isinstance(doc['first_sentence'], list) else doc['first_sentence']
                elif 'description' in doc:
                    description = doc['description']
                
                # Get cover image
                cover_url = ""
                if 'cover_i' in doc:
                    cover_id = doc['cover_i']
                    cover_url = f"https://covers.openlibrary.org/b/id/{cover_id}-L.jpg"
                
                print(f"  Found match: {doc.get('title', 'N/A')}")
                
                # Get additional details from works endpoint
                work_details = None
                if 'key' in doc:
                    work_details = get_work_details(doc['key'])
                    time.sleep(0.5)  # Brief pause between API calls

                # Use work details description if available, fallback to search result
                final_description = ""
                if work_details and work_details['description']:
                    final_description = work_details['description']
                elif 'first_sentence' in doc and doc['first_sentence']:
                    final_description = doc['first_sentence'][0] if isinstance(doc['first_sentence'], list) else doc['first_sentence']

                return {
                    'description': final_description,
                    'cover_url': cover_url,
                    'open_library_key': doc.get('key', ''),
                    'isbn': doc.get('isbn', [None])[0] if doc.get('isbn') else None,
                    'subjects': work_details['subjects'] if work_details else []
                }
        
        print(f"  No good match found in results")
        return None
        
    except requests.RequestException as e:
        print(f"  Error searching for {title}: {e}")
        return None

def enrich_books(books: List[Dict]) -> List[Dict]:
    """
    Enrich book data with OpenLibrary information
    """
    enriched_books = []
    
    for i, book in enumerate(books):
        print(f"\nProcessing book {i+1}/{len(books)}")
        
        # Search OpenLibrary
        ol_data = search_open_library(book['title'], book['author'])
        
        # Create enriched book object matching the TypeScript interface
        enriched_book = {
            "title": book['title'],
            "author": book['author'],
            "genres": book['genres'],
            "tags": book['tags'],
            "rating": book['rating'],
            "description": ol_data['description'] if ol_data and ol_data['description'] else "",
            "image": ol_data['cover_url'] if ol_data and ol_data['cover_url'] else "",
            "altImg": f"Cover of {book['title']} by {book['author']}",
            "dateAdded": book['dateAdded']
        }
        
        # Add optional fields if we have data
        if ol_data and ol_data.get('open_library_key'):
            enriched_book["_id"] = ol_data['open_library_key']
        
        enriched_books.append(enriched_book)
        
        # Be respectful to the API
        time.sleep(1)
    
    return enriched_books

def save_to_json(books: List[Dict], filename: str = "enriched_books.json"):
    """
    Save enriched book data to JSON file
    """
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(books, f, indent=2, ensure_ascii=False)
        print(f"\nBooks saved to {filename}")
    except Exception as e:
        print(f"Error saving to JSON: {e}")

def main():
    """
    Main function to run the enrichment process
    """
    print("Starting book enrichment process...")
    print(f"Processing {len(books_data)} books")
    
    enriched_books = enrich_books(books_data)
    save_to_json(enriched_books)
    
    print(f"\nEnrichment complete!")
    print(f"Successfully processed {len(enriched_books)} books")
    
    # Print summary
    books_with_descriptions = sum(1 for book in enriched_books if book['description'])
    books_with_covers = sum(1 for book in enriched_books if book['image'])
    
    print(f"Books with descriptions: {books_with_descriptions}/{len(enriched_books)}")
    print(f"Books with cover images: {books_with_covers}/{len(enriched_books)}")

if __name__ == "__main__":
    main()