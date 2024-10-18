class WordPromptsController < ApplicationController
    def index
      render json: WordPrompt.order("RANDOM()").limit(1)
    end
  end
  