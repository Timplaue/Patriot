import { useEffect, useRef, useState } from "react";

declare global {
    interface Window {
        ymaps: any;
    }
}

interface YandexMapProps {
    apiKey: string;
    center: [number, number];
    zoom: number;
    events: {
        _id: string;
        title: string;
        description: string;
        type: "military" | "civilian" | "other";
        coordinates: [number, number];
        date: string;
        source: string;
    }[];
    selectedEvent?: {
        _id: string;
        coordinates: [number, number];
    } | null;
}

const YandexMap: React.FC<YandexMapProps> = ({
                                                 apiKey,
                                                 center,
                                                 zoom,
                                                 events,
                                                 selectedEvent,
                                             }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<any>(null);
    const placemarks = useRef<any[]>([]);
    const [scriptLoaded, setScriptLoaded] = useState(false);

    const getIconColor = (type: string) => {
        switch (type) {
            case "military":
                return "islands#redIcon";
            case "civilian":
                return "islands#blueIcon";
            default:
                return "islands#grayIcon";
        }
    };

    useEffect(() => {
        // Проверяем, загружен ли уже скрипт
        if (scriptLoaded || typeof window.ymaps !== "undefined") return;

        const script = document.createElement("script");
        script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`;
        script.async = true;

        script.onload = () => {
            setScriptLoaded(true);
            window.ymaps.ready(() => {
                if (mapRef.current && !mapInstance.current) {
                    initMap();
                    addPlacemarks();
                }
            });
        };

        document.head.appendChild(script);

        return () => {
            // Очистка при размонтировании
            if (scriptLoaded) {
                document.head.removeChild(script);
                if (mapInstance.current) {
                    mapInstance.current.destroy();
                    mapInstance.current = null;
                }
                placemarks.current = [];
            }
        };
    }, [apiKey, scriptLoaded]);

    useEffect(() => {
        if (scriptLoaded && mapInstance.current) {
            updatePlacemarks();
        }
    }, [events]);

    useEffect(() => {
        if (scriptLoaded && mapInstance.current && selectedEvent) {
            centerMap();
        }
    }, [selectedEvent]);

    const initMap = () => {
        if (!mapRef.current) return;
        mapInstance.current = new window.ymaps.Map(mapRef.current, {
            center: center,
            zoom: zoom,
        });
    };

    const destroyMap = () => {
        if (mapInstance.current) {
            mapInstance.current.destroy();
            mapInstance.current = null;
        }
        placemarks.current = [];
    };

    const addPlacemarks = () => {
        if (!mapInstance.current || !window.ymaps) return;

        events.forEach(event => {
            if (!validateCoordinates(event.coordinates)) {
                console.error("Некорректные координаты для события:", event._id);
                return;
            }

            const placemark = createPlacemark(event);
            mapInstance.current.geoObjects.add(placemark);
            placemarks.current.push(placemark);
        });
    };

    const updatePlacemarks = () => {
        if (mapInstance.current) {
            mapInstance.current.geoObjects.removeAll(); // Удаляем старые метки
            addPlacemarks(); // Добавляем новые метки
        }
    };

    const centerMap = () => {
        if (selectedEvent && validateCoordinates(selectedEvent.coordinates)) {
            mapInstance.current.setCenter(selectedEvent.coordinates);
            mapInstance.current.setZoom(10);
        }
    };

    const validateCoordinates = (coords: [number, number]) => {
        return coords &&
            coords.length === 2 &&
            typeof coords[0] === "number" &&
            typeof coords[1] === "number";
    };

    const createPlacemark = (event: any) => {
        const placemark = new window.ymaps.Placemark(
            event.coordinates,
            {
                balloonContent: `
                    <div class="p-2">
                        <h3 class="font-bold text-lg">${event.title}</h3>
                        <p class="text-gray-600">${event.description}</p>
                        <div class="mt-2 text-sm text-gray-500">
                            <p>Тип: ${event.type}</p>
                            <p>Дата: ${new Date(event.date).toLocaleDateString("ru-RU")}</p>
                            <p>Источник: ${event.source}</p>
                        </div>
                    </div>
                `,
            },
            {
                preset: getIconColor(event.type),
                hideIconOnBalloonOpen: false,
            }
        );

        placemark.events.add("click", () => {
            const eventElement = document.querySelector(`[data-event-id="${event._id}"]`);
            eventElement?.scrollIntoView({ behavior: "smooth", block: "center" });
        });

        return placemark;
    };

    return <div ref={mapRef} className="w-full h-full rounded-lg shadow-lg" />;
};

export default YandexMap;