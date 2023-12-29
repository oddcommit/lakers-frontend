# lakers-frontend

## 操作マニュアル

[こちら](https://www.notion.so/trustart/a11d52b037224591a30999b2a672e14b)を参照

## 環境構築

```bash
git config --local core.hooksPath .githooks
chmod +x .githooks/pre-commit
npm install
```

## スクリプト

### 必要なライブラリのインストール

```bash
npm install
```

### サーバー起動

```bash
npm start
```

### モック環境でサーバー起動

```bash
npm run start:mock
# ログインには以下を使用
# email: mock@trustart.co.jp
# password: trust1234
```

### テストの実行

```bash
npm run test
```

### ビルドの実行

```bash
npm run bulid
```

## ディレクトリ構造

- `bulletproof-react`をベースに作成しているので、細かな方針で迷った際はそちらを参照すること

```sh
src
|
+-- components        # アプリケーション共通で使用するComponent
|
+-- configs           # グローバル設定
|
+-- features          # 機能ベースのモジュール
|
+-- hooks             # アプリケーション共通で使用するHooks
|
+-- routes            # ルーティング
|
+-- stores            # ストア
|
+-- test              # テスト・モックサーバー設定
|
+-- types             # アプリケーション共通で使用する型
|
+-- utils             # アプリケーション共通で使用する汎用関数
```

features フォルダの構造:

```sh
src/features/awesome-feature
|
+-- api             # 機能に対するAPI
|
+-- assets          # 機能に対するイメージファイル等
|
+-- components      # 機能に対するComponent
|
+-- hooks           # 機能に対するHooks
|
+-- routes          # 機能に対するルーティング
|
+-- stores          # 機能に対するストア
|
+-- types           # 機能に対する型
|
+-- utils           # 機能に対する汎用関数
|
+-- index.ts        # containerをexportする
|
+-- container.ts    # 機能のロジックに関心を持つ
|
+-- presenter.ts    # 機能のUIに関心を持つ
```
