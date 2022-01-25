//自分で作ったモジュールを読み込む
import './reactApp.jsx'
import my from './my.js';
//モジュールとしてcssファイルをjsに読み込む
import '../stylesheets/main.scss';

import Vue from 'vue';
import VueApp from './VueApp.vue';

// 追加(.tsを付けてくだだい)
import add from './add.ts';
// 追加
console.log(add(3, 9));

new Vue({
  el: '#vue-root',
  render: (h) => h(VueApp),
});

console.log('This is index.js');
my();
