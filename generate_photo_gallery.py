#!/usr/bin/env python3
"""
Photo Gallery Generator for Easter Parade Matzo Ball
Generates HTML photo gallery code from photos directory
"""

import os
from pathlib import Path

def get_photo_files(photo_dir="photos"):
    """Get all image files from the photos directory"""
    photo_extensions = {'.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'}
    photo_dir_path = Path(photo_dir)

    if not photo_dir_path.exists():
        print(f"Error: {photo_dir} directory not found")
        return []

    photos = []
    for file in sorted(photo_dir_path.iterdir()):
        if file.suffix in photo_extensions and file.name != 'README.txt':
            # Skip obvious duplicates (files with " 2" in name)
            if " 2." not in file.name:
                photos.append(file.name)

    return photos

def generate_photo_html(photos):
    """Generate HTML for photo gallery"""
    html_parts = []

    # Add opening div for photo grid
    html_parts.append('    <div class="grid md:grid-cols-4 gap-6">')

    for idx, photo in enumerate(photos, 1):
        photo_path = f"photos/{photo}"
        photo_name = photo.replace('.JPG', '').replace('.jpg', '').replace('.jpeg', '').replace('.png', '')

        # Generate HTML for each photo
        photo_html = f'''
        <!-- Photo {idx} -->
        <div class="rounded-2xl overflow-hidden shadow-lg card-hover photo-hover cursor-pointer" onclick="openModal('{photo_path}', 'Parade Photo {idx}')">
            <img src="{photo_path}" alt="Easter Parade Matzo Ball Photo {idx}" class="w-full h-64 object-cover">
            <div class="bg-purple-900 text-white p-3 text-center">
                <p class="font-bold cinzel">Photo {idx}</p>
            </div>
        </div>'''

        html_parts.append(photo_html)

    # Close the grid div
    html_parts.append('    </div>')

    return '\n'.join(html_parts)

def main():
    """Main function to generate and save photo gallery HTML"""
    print("Easter Parade Matzo Ball - Photo Gallery Generator")
    print("=" * 50)

    # Get photos
    photos = get_photo_files()
    print(f"Found {len(photos)} photos in photos/ directory")

    if not photos:
        print("No photos found. Exiting.")
        return

    # Generate HTML
    html = generate_photo_html(photos)

    # Save to file
    output_file = "photo_gallery_html.txt"
    with open(output_file, 'w') as f:
        f.write(html)

    print(f"\nGenerated HTML saved to: {output_file}")
    print(f"Total photos: {len(photos)}")
    print("\nPhoto list:")
    for idx, photo in enumerate(photos, 1):
        print(f"  {idx}. {photo}")

    print("\n" + "=" * 50)
    print("Next step: Copy the HTML from photo_gallery_html.txt")
    print("and paste it into photos.html in the photo grid section.")

if __name__ == "__main__":
    main()
