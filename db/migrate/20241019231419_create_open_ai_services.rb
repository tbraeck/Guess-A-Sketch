class CreateOpenAiServices < ActiveRecord::Migration[7.1]
  def change
    create_table :open_ai_services do |t|

      t.timestamps
    end
  end
end
