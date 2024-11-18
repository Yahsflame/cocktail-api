Rails.application.routes.draw do
  namespace :api do
    get 'search', to: 'search#index'
    get 'drinks/:id', to: 'detail#show'
  end
end