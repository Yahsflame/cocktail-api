source "https://rubygems.org"

ruby "3.3.6"  # Matching your rbenv Ruby version

# Rails core
gem "rails", "~> 7.1.3"
gem "sqlite3", "~> 1.4"
gem "puma", ">= 5.0"

# API related
gem 'rack-cors'
gem 'active_model_serializers'
gem 'kaminari'
gem 'sprockets-rails'

# Required for Rails
gem "bootsnap", require: false
# gem "tzinfo-data", platforms: %i[ windows jruby ]

group :development, :test do
  gem 'rspec-rails'
  gem 'factory_bot_rails'
  gem 'faker'
  gem 'database_cleaner-active_record'
  # gem "debug", platforms: %i[ mri windows ]
end