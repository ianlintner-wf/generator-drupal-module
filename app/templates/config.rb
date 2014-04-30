# Require any additional compass plugins here.

http_path = "/"
css_dir = "css"
sass_dir = "sass"
images_dir = "images"
javascripts_dir = "scripts"

preferred_syntax = <%= sassSyntax %>
disable_warnings = true

environment = :development
line_comments = (enviroment == :production) ? false : false
output_style = (environment == :production) ? :compressed : :expanded
