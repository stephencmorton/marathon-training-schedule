## marathon-training-program

This provides a simple web-based tool for running groups to post marathon training programs to the web that auto-adjust to
fit your upcoming race dates.

The program also provides you a good indication of your training paces based on your goal race pace.
### TODO
- Fix up date routines and variables. 
- Remove _m variables or at least rename them _d as they're dates not moments.
- Allow modular drop-in of races
- Allow arbitrary race dates.
- Remove crazy race schedule code with filename to variable to filename

**npm run build errors**
@stephencmorton ➜ /workspaces/marathon-training-schedule (vite) $ npm run build

> react_marathon_training_program@0.1.0 build
> vite build

vite v7.3.0 building client environment for production...
<script src="js/jquery-2.2.4.min.js"> in "/index.html" can't be bundled without type="module" attribute
<script src="js/bootstrap.min.js"> in "/index.html" can't be bundled without type="module" attribute

css/bootstrap.min.css doesn't exist at build time, it will remain unchanged to be resolved at runtime

**npm install error**
npm install
npm warn deprecated core-js@2.6.12: core-js@<3.23.3 is no longer maintained and not recommended for usage due to the number of issues. Because of the V8 engine whims, feature detection in old core-js versions could cause a slowdown up to 100x even if nothing is polyfilled. Some versions have web compatibility issues. Please, upgrade your dependencies to the actual version of core-js.


**MORE**

- Ask AI about improvements