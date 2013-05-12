# Require any additional compass plugins here.

# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "_/css"
sass_dir = "_/scss"
images_dir = "_/img"
javascripts_dir = "_/js"
fonts_dir = "../fonts"

output_style = :compact

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false
color_output = false


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass _/scss scss && rm -rf sass && mv scss sass
preferred_syntax = :scss

sass_options = { :debug_info => true }