# app/controllers/guesses_controller.rb
class GuessesController < ApplicationController
    require 'openai'
  
    def create
      # Correctly require the image parameter
      drawing_data = params.require(:image)
  
      # Decode the base64 data before sending it to OpenAI
      image_data = decode_base64_image(drawing_data)
  
      # Get the guess from OpenAI
      guess = get_guess_from_openai(image_data)
  
      render json: { guess: guess }
    end
  
    private
  
    def decode_base64_image(base64_string)
      # Remove the prefix if it exists (data:image/png;base64,)
      if base64_string.start_with?('data:image/')
        base64_string = base64_string.split(',')[1]
      end
      # Decode the base64 string
      Base64.decode64(base64_string)
    end
  
    def get_guess_from_openai(image_data)
      # Initialize OpenAI client
      client = OpenAI::Client.new(access_token: ENV['OPENAI_API_KEY'])
  
      # Here, you would need to use the appropriate OpenAI API that can accept images
      response = client.images.create(
        parameters: {
          file: image_data,
          model: 'gpt-4' # or the appropriate model for image analysis
        }
      )
  
      # Extract and return the guess from the response
      response.dig("data", 0, "url") # Adjust this based on the actual response structure
    end
  end
  