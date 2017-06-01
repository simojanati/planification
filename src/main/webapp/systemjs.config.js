/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      'angular-dual-listbox': 'npm:angular-dual-listbox/angular-dual-listbox.bundle.js',
      'ngx-tooltip': 'node_modules/ngx-tooltip',
      'ngx-dropdown': 'node_modules/ngx-dropdown',
      'angular2-datatable': 'npm:angular2-datatable',
      'lodash': 'npm:lodash/lodash.js',
      'ng2-contextmenu': 'npm:ng2-contextmenu/bundles/contextmenu.umd.js',
      // other libraries
      'rxjs': 'npm:rxjs'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      "ngx-tooltip": {
        "main": "index.js",
        "defaultExtension": "js"
      },
      "ngx-dropdown": {
         "main": "index.js",
          "defaultExtension": "js" 
      },
      "angular2-datatable": {
        "main": "index.js",
        "defaultExtension": "js"
      }
    }
  });
})(this);