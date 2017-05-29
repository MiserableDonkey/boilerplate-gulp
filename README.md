# Boilerplate - Gulp
-----

Minimalistic web project boilerplate using Gulp. Compiles image, script, style,
and template files into a local development environment or distributable folder.


## Getting started
-----

1. Clone [boilerplate-gulp](https://github.com/MiserableDonkey/boilerplate-gulp.git) into your project development folder.

2. Install packages and dependencies.  

```
npm install && bower install;
```

3. Start the development server:

```
gulp develop;
```

4. Distribute the project package.

```
gulp distribute;
```


## Configuring projects
-----

* /data/main.json contains configuration data for publishing projects.
* /data/pages/ contains data for static page files.
* /develop contains project templates, scripts, styles, and images.
* /bower_components contains client-side dependencies described by bower.json.
* /node_modules contains server-side dependencies described by package.json.



### Create a page
-----

**Define page data**

*/data/main.json*

```
{
  "pages": {
    "compileJSTemplates": true, // Create a templates.js file with dynamic Handlebars templates.
    "develop": {
      "files": [{
        "id": "project-index", // Unique identifier for page
        "data": "pages/index.json", // Page data file
        "title": "Project", // Page file title
        "layout": "index.handlebars", // Handlebars layout template
        "dirname": ".", // Destination directory name
        "basename": "index", // Destination page file name
        "extname": ".html" // Destination page file extension
      }]
    }
  }
}
```


**Create a page template**

*/develop/templates/layouts*

```
<!DOCTYPE html>

<html lang="en">

<head>

<base href="." target="_blank" />

<meta charset="utf-8" />
<meta http-equiv="x-ua-compatible" content="ie=edge, chrome=1" />

<!-- Page file data values from config.pages.develop.files.data (/data/pages JSON file references) -->
<title>{{title}}</title>

<!-- Compiled project reference in output folder. Includes config.data.styles.application -->
<link rel="stylesheet" href="css/main.css" />

</head>

<body>
<!-- JS Vendor dependency reference in output folder (.tmp/ or dist/ - does not reside in develop/). Includes config.data.scripts.vendor -->
<script src="js/vendor/handlebars.js"></script>
<!-- Compiled page template reference in output folder. Include when config.data.pages.compileJSTemplates is true -->
<script src="js/templates.js"></script>
<!-- Compiled project scripts reference in output folder. Includes config.data.scripts.application -->
<script src="js/main.js"></script>

</body>

</html>
```


**Create a template partial**

*/develop/templates/partials/application.hbs*

```
<div class="application">
  <header>
    <span>HEADER</span>
  </header>
  <main>
    <div class="content">
      <section>CONTENT</section>
    </div>
  </main>
  <footer>
    <span>FOOTER</span>
  </footer>
</div>
```


**Include the template partial in a page template**

*/develop/templates/layouts/index.handlebars*

```
<!--
  Reference filename relative to /develop/templates/partials folder.
  Example:
  * /develop/templates/partials/application.hbs = {{> application}}
  * /develop/templates/partials/application/header.hbs = {{> application/header}}
-->
{{> application}}
```


**Render page template dynamically**

*/develop/scripts/main.js*

```
/*
  Templates are namespaced under Application.Templates and referenced by filename
  Example:
  * /develop/templates/partials/application.hbs = Application.Templates.application
  * /develop/templates/partials/application/header.hbs = Application.Templates.application.header
*/
Application.Templates.application();
```


**Pass data context to template**

*Template file**

```
{{> application dataObject}}
```

*Script file*

```
Application.Templates.application(dataObject);
```


### Add a client-side dependency

1. From the project folder command line install a front end dependency.

```
bower install jquery --save-dev;
```

2. Include dependency in project.

*/data/main.json*

```
{
  "scripts": {
    "develop": {
      "vendor": {
        "files": [
          "bower_components/jquery/dist/jquery.js"
        ]
      }
    }
  }
}
```

3. Define dependency within project.

*/develop/templates/layouts/index.handlebars*

```
<script src="js/vendor/jquery.js"></script>
```


### Generate a static project folder

1. From the project folder command line issue command:

```
gulp distribute
```

2. The folder appears as **/dist**.



## Notes
-----
This is a minimalist boilerplate. Start a local development environment configured
with Gulp, Handlebars, and SASS in less time than it takes to microwave Top Ramen.
