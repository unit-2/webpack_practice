//ライブラリをインポート
import ReactDom from 'react-dom';
//react本体
import * as React from 'react';

//コンポーネントを定義
const App = (props) => {
	return (
		<div style={{ color: '#000'}}>
      Hello, React App!
    </div>
  );
};

//上記をDOMにマウントする
//react-rootというIDをもつエレメントをドキュメントから探す
const reactRoot = document.getElementById('react-root');
if (reactRoot) {
	//あれば、Appというコンポーネントをマウントする
  ReactDom.render(<App />, reactRoot);
} else {
  console.log('No root element found');
}
