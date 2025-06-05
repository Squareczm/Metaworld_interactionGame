from flask import Flask, jsonify, request
import random # For varying placeholder images

app = Flask(__name__)

# Simulated image generation function
def generate_image_placeholder(prompt_text=""):
    """
    Simulates calling an image generation API.
    Returns a URL to a placeholder image.
    Uses placekitten.com for variety, or a static one if preferred.
    """
    # Simple way to vary image size slightly based on prompt length
    # to make it seem more dynamic.
    # Placekitten uses width/height in URL.
    # Ensure width and height are within a reasonable range for kittens (e.g., 200-400px)
    base_size = 200
    extra_size = len(prompt_text) % 50 # Small variation
    width = base_size + extra_size
    height = base_size + (50 - extra_size) # Keep aspect ratio somewhat varied

    # Ensure minimum size if prompt is very short
    width = max(200, width)
    height = max(200, height)

    # Construct URL for placekitten
    # return f"http://placekitten.com/{width}/{height}"
    # Using a more reliable and SFW placeholder service:
    return f"https://via.placeholder.com/{width}x{height}.png?text=Image+for+{prompt_text.replace(' ', '+')[:20]}"


@app.route('/api/greet')
def greet():
    return jsonify(message="Hello from the backend!")

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message', '')

    # Simple echo logic for now
    bot_reply = f"Backend received: '{user_message}'"

    # Use the new function to get an image placeholder URL
    image_url = generate_image_placeholder(user_message)

    return jsonify(
        reply=bot_reply,
        image_url=image_url # Changed from image_url_placeholder to image_url
    )

if __name__ == '__main__':
    app.run(debug=True)
