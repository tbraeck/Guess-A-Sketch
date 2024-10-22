require 'httparty'

class OpenAiService
  BASE_URL = 'https://api.openai.com/v1/chat/completions' # Using chat completions

  def initialize(api_key:)
    @api_key = api_key
  end

  def make_guess(drawing_description)
    # Here, you would send a description of the drawing instead of the image data
    response = HTTParty.post(BASE_URL,
      headers: {
        'Authorization' => "Bearer #{@api_key}",
        'Content-Type' => 'application/json'
      },
      body: {
        model: "gpt-3.5-turbo", # Use the chat model
        messages: [
          { role: 'user', content: "What do you think this drawing represents? Here's a description: #{drawing_description}" }
        ]
      }.to_json
    )

    if response.success?
      # Extract the guess from the response
      response_body = JSON.parse(response.body)
      guess = response_body.dig("choices", 0, "message", "content")
      guess || "No guess provided."
    else
      handle_error(response)
    end
  end

  private

  def handle_error(response)
    case response.code
    when 400
      raise "Bad Request: #{response.message}. Please check your input."
    when 401
      raise "Unauthorized: #{response.message}. Check your API key."
    when 429
      raise "Rate Limit Exceeded: #{response.message}. Try again later."
    else
      raise "Error: #{response.code} - #{response.message}"
    end
  end
end
