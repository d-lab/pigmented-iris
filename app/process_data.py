import boto3
import csv
import json

def find_image_url(img_id):
    bucket_name = 'crowdiris'
    prefix = f"Cropped/{img_id}"

    # Connect to S3
    s3_client = boto3.client('s3')

    # List objects in the bucket with the given prefix
    response = s3_client.list_objects_v2(Bucket=bucket_name, Prefix=prefix)

    for obj in response['Contents']:
        # Extract image ID from the object key

        return get_public_object_url(obj['Key'])

    # Return None if the image ID was not found in S3
    return None


def save_image_urls_to_file(image_urls, file_path):
    with open(file_path, "w") as file:
        json.dump(image_urls, file, indent=2)

def get_public_object_url(object_key):
    # Generate a public URL for the object
    object_url = f"https://crowdiris.s3.us-west-1.amazonaws.com/{object_key}"

    return object_url

def main():
    # Replace 'data.csv' with the path to your CSV file
    csv_file = 'ImagesNeedMoreAnnotation.csv'

    with open(csv_file, 'r') as file:
        # Read CSV file
        reader = csv.DictReader(file)
        image_urls = []
        i = 0
        for row in reader:
            img_id = "Cropped/" + row['imgID'] + ".jpg"
            image_url = get_public_object_url(img_id)
            if image_url:
                image_urls.append({
                    "imageUrl": image_url
                })
                i = i + 1
                print(i)
            else:
                print(f"Image ID: {img_id}, Image not found in S3")

        output_file = "image_urls.json"
        save_image_urls_to_file(image_urls, output_file)

if __name__ == '__main__':
    main()