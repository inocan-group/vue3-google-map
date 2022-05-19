//#autoindex, exclude: shims-vue.d, composables, shared, themes, utils

// #region autoindexed files

// index last changed at: 5th May, 2022, 10:31 AM ( GMT+2 )
// export: named; exclusions: shims-vue.d, composables, shared, themes, utils, index, private.
// files: shims-google-maps-d.
// directories: @types, components.

// local file exports
export * from "./shims-google-maps-d";

// directory exports
export * from "./@types/index";
export * from "./components/index";

// Note:
// -----
// This file was created by running: "dd devops autoindex"; it assumes you have
// the 'do-devops' pkg installed as a dev dep.
//
// By default it assumes that exports are named exports but this can be changed by
// adding a modifier to the '// #autoindex' syntax:
//
//    - autoindex:named     same as default, exports "named symbols"
//    - autoindex:default   assumes each file is exporting a default export
//                          and converts the default export to the name of the
//                          file
//    - autoindex:offset    assumes files export "named symbols" but that each
//                          file's symbols should be offset by the file's name
//                          (useful for files which might symbols which collide
//                          or where the namespacing helps consumers)
//
// You may also exclude certain files or directories by adding it to the
// autoindex command. As an example:
//
//    - autoindex:named, exclude: foo,bar,baz
//
// Also be aware that all of your content outside the defined region in this file
// will be preserved in situations where you need to do something paricularly awesome.
// Keep on being awesome.

// #endregion
