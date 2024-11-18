# config/initializers/cors.rb
Rails.application.config.middleware.insert_before 0, Rack::Cors do |cors|
  cors.allow do |allow|
    allow.origins 'http://localhost:5173', 'http://localhost:3000', 'http://localhost:3001'
    
    allow.resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: false,
      expose: ['Total-Count']
  end
end