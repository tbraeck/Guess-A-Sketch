require 'httparty'

class OpenAiService
  BASE_URL = 'https://api.openai.com/v1/chat/completions' # Using chat completions

  def initialize(api_key:)
    @api_key = api_key
  end

  def make_guess(image_data)
    # You may want to preprocess the image_data here (like converting to base64) if necessary
    response = HTTParty.post(BASE_URL,
      headers: {
        'Authorization' => "Bearer #{@api_key}",
        'Content-Type' => 'application/json'
      },
      body: {
        model: "gpt-3.5-turbo", # Use the chat model
        messages: [
          { role: 'user', content: "What do you think this drawing represents? Here's the drawing: #{image_data}" }
        ]
      }.to_json
    )

    if response.success?
      # Extract the guess from the response
      JSON.parse(response.body)
    else
      raise "Error: #{response.code} - #{response.message}"
    end
  end
end
