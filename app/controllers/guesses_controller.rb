class GuessesController < ApplicationController
  require 'google/cloud/vision'
  require 'google/cloud/text_to_speech'

  def create
    drawing_data = params.require(:image)
    image_data = decode_base64_image(drawing_data)

    # Get the guess from Vision API
    guess = get_guess_from_openai(image_data)

    # Vocalize the guess
    vocalize_guess(guess)

    render json: { guess: guess }
  end

  private

  def decode_base64_image(base64_string)
    if base64_string.start_with?('data:image/')
      base64_string = base64_string.split(',')[1]
    end
    Base64.decode64(base64_string)
  end

  def get_guess_from_openai(image_data)
    # Initialize Google Cloud Vision API
    image_annotator = Google::Cloud::Vision.image_annotator
    response = image_annotator.label_detection(image: image_data)
    guess = response.responses[0].label_annotations[0].description
    guess
  end

  def vocalize_guess(guess)
    client = Google::Cloud::TextToSpeech.text_to_speech_service
    input = { text: guess }
    voice = { language_code: 'en-US', ssml_gender: :NEUTRAL }
    audio_config = { audio_encoding: :MP3 }
    response = client.synthesize_speech(input: input, voice: voice, audio_config: audio_config)

    File.open("output.mp3", "wb") do |file|
      file.write(response.audio_content)
    end

    # Play or send the mp3 file as needed
  end
end
