# config/application.rb
require_relative "boot"

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_mailbox/engine"
require "action_text/engine"
require "action_view/railtie"
require "action_cable/engine"

Bundler.require(*Rails.groups)

module YourAppName  # Your actual app name here
  class Application < Rails::Application
    config.load_defaults 7.1
    
    # This is important - it tells Rails this is an API
    config.api_only = true
    
    # CORS configuration
    config.middleware.insert_before 0, Rack::Cors do |cors|
      cors.allow do |allow|
        allow.origins 'http://localhost:3001'
        allow.resource '*',
          headers: :any,
          methods: [:get, :post, :put, :patch, :delete, :options, :head],
          credentials: false
      end
    end
  end
end