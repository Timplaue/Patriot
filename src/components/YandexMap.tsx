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
        if (scriptLoaded || document.querySelector('script[src*="api-maps.yandex.ru"]')) return;

        const script = document.createElement("script");
        script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`;
        script.async = true;

        script.onload = () => {
            window.ymaps.ready(() => {
                setScriptLoaded(true);
                initMap();
                addPlacemarks();
            });
        };

        script.onerror = () => {
            console.error("Ошибка загрузки Яндекс.Карт");
        };

        document.head.appendChild(script);

        return () => {
            destroyMap();
        };
    }, [apiKey, scriptLoaded]);

    useEffect(() => {
        if (scriptLoaded && mapInstance.current) {
            addPlacemarks();
        }
    }, [events, scriptLoaded]);

    useEffect(() => {
        if (scriptLoaded && mapInstance.current && selectedEvent) {
            centerMap();
        }
    }, [selectedEvent, scriptLoaded]);

    const initMap = () => {
        if (!mapRef.current || mapInstance.current) return;

        mapInstance.current = new window.ymaps.Map(mapRef.current, {
            center: center,
            zoom: zoom,
            controls: ['zoomControl']
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

        // Очищаем старые метки перед добавлением новых
        mapInstance.current.geoObjects.removeAll();

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

    const centerMap = () => {
        if (selectedEvent && validateCoordinates(selectedEvent.coordinates)) {
            mapInstance.current.setCenter(selectedEvent.coordinates, 10, {
                duration: 300
            });
        }
    };

    const validateCoordinates = (coords: [number, number]) => {
        return coords &&
            Math.abs(coords[0]) <= 90 &&
            Math.abs(coords[1]) <= 180;
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
                balloonCloseButton: false,
                hideIconOnBalloonOpen: false
            }
        );

        placemark.events.add('click', () => {
            const eventElement = document.querySelector(`[data-event-id="${event._id}"]`);
            eventElement?.scrollIntoView({ behavior: "smooth", block: "center" });
        });

        return placemark;
    };

    return <div ref={mapRef} className="w-full h-full rounded-lg shadow-lg" />;
};

export default YandexMap;