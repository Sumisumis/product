import { useNavigate } from "react-router-dom";
import { useState } from "react";

type SettingsData = {
  nickname: string;
  email: string;
  address: string;
  birthday: string;
  age: string;
  icon: string;
  locationEnabled: boolean;
  mailEnabled: boolean;
};

const defaultSettings: SettingsData = {
  nickname: "",
  email: "",
  address: "",
  birthday: "",
  age: "",
  icon: "",
  locationEnabled: false,
  mailEnabled: false,
};

const Mypage = () => {
  const navigate = useNavigate();

  // 保存されている設定を読み込む
  const [settings] = useState<SettingsData>(() => {
    const saved = localStorage.getItem("chocohaco-settings");

    return saved
      ? { ...defaultSettings, ...JSON.parse(saved) }
      : defaultSettings;
  });

  return (
    <div className="mypage">
      <section className="mypage-profile" aria-label="ユーザー情報">
        <div className="mypage-avatar">
          {settings.icon ? (
            <img src={settings.icon} alt="プロフィール画像" />
          ) : null}
        </div>

        <p className="mypage-nickname">
          {settings.nickname || "ニックネーム未設定"}
        </p>
      </section>

      <section className="mypage-shop-list" aria-label="お店リスト">
        <h2 className="mypage-section-title">お店リスト</h2>
        <p className="mypage-shop-list-empty">
          登録したお店はまだありません。
        </p>
      </section>

      <nav className="mypage-links" aria-label="マイページメニュー">
        <button
          type="button"
          className="mypage-link-button"
          onClick={() => navigate("/settings")}
        >
          設定
        </button>

        <button
          type="button"
          className="mypage-link-button"
          onClick={() => navigate("/how-to-use")}
        >
          使い方
        </button>
      </nav>
    </div>
  );
};

export default Mypage;