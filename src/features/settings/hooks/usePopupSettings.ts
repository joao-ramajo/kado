import { useCallback, useEffect, useState } from "react";

export type PopupSettings = {
	enabled: boolean;
	intervalSeconds: number;
};

const STORAGE_KEY = "KADO_POPUP_SETTINGS";
const SETTINGS_CHANGED_EVENT = "kado-popup-settings-changed";

const DEFAULT_SETTINGS: PopupSettings = {
	enabled: true,
	intervalSeconds: 10,
};

const clampInterval = (value: number) => {
	if (Number.isNaN(value)) return DEFAULT_SETTINGS.intervalSeconds;
	return Math.min(120, Math.max(5, value));
};

const loadSettings = (): PopupSettings => {
	const raw = localStorage.getItem(STORAGE_KEY);
	if (!raw) return DEFAULT_SETTINGS;

	try {
		const parsed = JSON.parse(raw) as Partial<PopupSettings>;
		return {
			enabled:
				typeof parsed.enabled === "boolean"
					? parsed.enabled
					: DEFAULT_SETTINGS.enabled,
			intervalSeconds: clampInterval(
				typeof parsed.intervalSeconds === "number"
					? parsed.intervalSeconds
					: DEFAULT_SETTINGS.intervalSeconds,
			),
		};
	} catch {
		return DEFAULT_SETTINGS;
	}
};

export function usePopupSettings() {
	const [settings, setSettings] = useState<PopupSettings>(() => loadSettings());

	const persist = useCallback((next: PopupSettings) => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
		window.dispatchEvent(new Event(SETTINGS_CHANGED_EVENT));
	}, []);

	const refreshFromStorage = useCallback(() => {
		setSettings(loadSettings());
	}, []);

	useEffect(() => {
		window.addEventListener("storage", refreshFromStorage);
		window.addEventListener(SETTINGS_CHANGED_EVENT, refreshFromStorage);

		return () => {
			window.removeEventListener("storage", refreshFromStorage);
			window.removeEventListener(SETTINGS_CHANGED_EVENT, refreshFromStorage);
		};
	}, [refreshFromStorage]);

	const setEnabled = useCallback(
		(enabled: boolean) => {
			setSettings((prev) => {
				const next = { ...prev, enabled };
				persist(next);
				return next;
			});
		},
		[persist],
	);

	const setIntervalSeconds = useCallback(
		(intervalSeconds: number) => {
			setSettings((prev) => {
				const next = {
					...prev,
					intervalSeconds: clampInterval(intervalSeconds),
				};
				persist(next);
				return next;
			});
		},
		[persist],
	);

	return { settings, setEnabled, setIntervalSeconds };
}
