const Mypage = () => {
  return (
    <div className="mypage">
      <section className="mypage-profile" aria-label="ユーザー情報">
        <div className="mypage-avatar" aria-hidden="true" />
        <p className="mypage-nickname">ニックネーム</p>
      </section>

      <section className="mypage-shop-list" aria-label="お店リスト">
        <h2 className="mypage-section-title">お店リスト</h2>
        <p className="mypage-shop-list-empty">登録したお店はまだありません。</p>
      </section>

      <nav className="mypage-links" aria-label="マイページメニュー">
        <button type="button" className="mypage-link-button">
          設定
        </button>
        <button type="button" className="mypage-link-button">
          使い方
        </button>
      </nav>
    </div>
  );
};

export default Mypage;
