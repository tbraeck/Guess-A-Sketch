class DrawingsController < ApplicationController

    def index 
      render json: Drawing.all
    end

    def create
      drawing = Drawing.new(drawing_params)
      if drawing.save
        render json: { message: 'Drawing saved!' }, status: :created
      else
        render json: { error: drawing.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    private
  
    def drawing_params
      params.require(:drawing).permit(:data, :user_id, :word_prompt_id)
    end
  end
  