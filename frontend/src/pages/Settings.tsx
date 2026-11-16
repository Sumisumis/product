
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavigationGuardContext } from "../App";

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

const loadSettings = (): SettingsData => {
  try {
    const saved = localStorage.getItem("chocohaco-settings");
    return saved
      ? { ...defaultSettings, ...JSON.parse(saved) }
      : defaultSettings;
  } catch {
    return defaultSettings;
  }
};

const Settings = () => {
  const navigate = useNavigate();
  const navigation = useContext(NavigationGuardContext);

  const [settings, setSettings] = useState<SettingsData>(loadSettings);
  const [originalSettings, setOriginalSettings] =
    useState<SettingsData>(loadSettings);

  // 保存済みニックネーム
  const [savedNickname, setSavedNickname] = useState(() => {
    const saved = localStorage.getItem("chocohaco-settings");
    return saved ? JSON.parse(saved).nickname || "" : "";
  });

  const [modal, setModal] = useState<"confirm" | "success" | null>(null);
  const [pendingPath, setPendingPath] = useState<string | null>(null);

  const hasChanges =
    JSON.stringify(settings) !== JSON.stringify(originalSettings);

  const updateSetting = (
    key: keyof SettingsData,
    value: string | boolean
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = (file?: File) => {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      updateSetting("icon", String(reader.result));
    };

    reader.readAsDataURL(file);
  };

  const requestPageChange = useCallback(
    (path: string) => {
      if (path === "/settings") return;

      if (JSON.stringify(settings) !== JSON.stringify(originalSettings)) {
        setPendingPath(path);
        setModal("confirm");
      } else {
        navigate(path);
      }
    },
    [settings, originalSettings, navigate]
  );

  useEffect(() => {
    navigation?.registerNavigationHandler(requestPageChange);

    return () => {
      navigation?.registerNavigationHandler(null);
    };
  }, [navigation, requestPageChange]);

  const handleSave = () => {
  localStorage.setItem("chocohaco-settings", JSON.stringify(settings));

  setOriginalSettings(settings);
  setSavedNickname(settings.nickname);

  setModal("success");
};

  const handleCancel = () => {
    setModal(null);
    setPendingPath(null);
  };

  const handleSuccessReturn = () => {
    setModal(null);
    navigate("/mypage");
  };

  return (
    <div className="settings-page">
      <h1 className="settings-title">設定</h1>

      <div className="settings-profile">
        <label className="settings-avatar">
          {settings.icon ? (
            <img src={settings.icon} alt="ユーザーアイコン" />
          ) : (
            <span>ユーザー<br />アイコン</span>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e.target.files?.[0])}
            hidden
          />
        </label>

        <p className="settings-nickname">
  {savedNickname || "ニックネーム未設定"}
</p>
      </div>

      <div className="settings-table">
        <label className="settings-row">
          <span>ニックネーム</span>
          <input
            value={settings.nickname}
            onChange={(e) => updateSetting("nickname", e.target.value)}
            placeholder="入力欄"
          />
        </label>

        <label className="settings-row">
          <span>メールアドレス</span>
          <input
            type="email"
            value={settings.email}
            onChange={(e) => updateSetting("email", e.target.value)}
            placeholder="入力欄"
          />
        </label>

        <label className="settings-row">
          <span>住所</span>
          <input
            value={settings.address}
            onChange={(e) => updateSetting("address", e.target.value)}
            placeholder="入力欄"
          />
        </label>

        <label className="settings-row">
          <span>誕生日</span>
          <input
            type="date"
            value={settings.birthday}
            onChange={(e) => updateSetting("birthday", e.target.value)}
          />
        </label>

        <label className="settings-row">
          <span>年齢</span>
          <select
            value={settings.age}
            onChange={(e) => updateSetting("age", e.target.value)}
          >
            <option value="">選択式</option>
            {Array.from({ length: 101 }, (_, i) => (
              <option key={i} value={String(i)}>
                {i}歳
              </option>
            ))}
          </select>
        </label>

        <div className="settings-row">
          <span>アイコンの設定</span>
          <label className="settings-image-button">
            画像の選択
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e.target.files?.[0])}
              hidden
            />
          </label>
        </div>

        <div className="settings-row">
          <span>現在地の情報を取得</span>
          <button
            type="button"
            className={`settings-toggle ${
              settings.locationEnabled ? "on" : ""
            }`}
            onClick={() =>
              updateSetting("locationEnabled", !settings.locationEnabled)
            }
          >
            {settings.locationEnabled ? "オン" : "オフ"}
          </button>
        </div>

        <div className="settings-row">
          <span>メールの配信設定</span>
          <button
            type="button"
            className={`settings-toggle ${
              settings.mailEnabled ? "on" : ""
            }`}
            onClick={() =>
              updateSetting("mailEnabled", !settings.mailEnabled)
            }
          >
            {settings.mailEnabled ? "オン" : "オフ"}
          </button>
        </div>
      </div>

      <button
        type="button"
        className="settings-save-button"
        onClick={() => {
          setPendingPath(null);
          setModal("confirm");
        }}
        disabled={!hasChanges}
      >
        変更を保存
      </button>

      {modal && (
        <div className="settings-modal-overlay">
          <div
            className="settings-modal"
            role="dialog"
            aria-modal="true"
          >
            {modal === "confirm" ? (
              <>
                <p>
                  変更が保存されていません。
                  <br />
                  変更を保存しますか？
                </p>

                <div className="settings-modal-buttons">
                  <button
                    type="button"
                    className="settings-confirm-button"
                    onClick={() => {
                      const destination = pendingPath;
                      localStorage.setItem(
                        "chocohaco-settings",
                        JSON.stringify(settings)
                      );
                      setOriginalSettings(settings);
                      setSavedNickname(settings.nickname);
                      setModal(null);
                      setPendingPath(null);

                      if (destination) {
                        navigate(destination);
                      } else {
                        setModal("success");
                      }
                    }}
                  >
                    保存する
                  </button>

                  <button
                    type="button"
                    className="settings-cancel-button"
                    onClick={handleCancel}
                  >
                    キャンセル
                  </button>
                </div>
              </>
            ) : (
              <>
                <p>変更を保存しました</p>

                <button
                  type="button"
                  className="settings-return-button"
                  onClick={handleSuccessReturn}
                >
                  マイページに戻る
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;