import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react';
import Pins from './Pins';
import ZoneInfo from './Zone_Info';
import ZonePopup from './Zone_Popup';
import { convertCords, checkInsidePolys, checkIntersection } from '../../shared/functions';

const Map = (props) => {
    const [tempMap, setMap] = useState({});
    const [tempMaps, setMaps] = useState({});
    const [tempLine, setTempLine] = useState(null)
    const [tempPoly, setTempPoly] = useState(null)
    const [tempCords, setTempCords] = useState([]);
    const [canClick, setClick] = useState(true);
    const [openModal, setModal] = useState(false);
    const [color, setColor] = useState('#121212')
    const [popup, showPopup] = useState(false);
    const [popupZone, setPopupZone] = useState('');
    const [popCord, setPopCord] = useState({});

    const _handleCloseTemp = () => {
        tempLine.setMap(null);
        tempPoly.setMap(null);
        setTempCords([]);
        setModal(false);
        setClick(true);
    }

    const _drawTempLines = (path) => {
        let pointsLines = new tempMaps.Polyline({
            path: path,
            strokeColor: color,
            strokeOpacity: 1.0,
            strokeWeight: 1
        })
        if (tempLine) {
            tempLine.setMap(null);
        }
        pointsLines.setMap(tempMap);
        setTempLine(pointsLines);
    }

    const _handleAddPoint = (obj) => {
        const { lat, lng } = obj;
        const polys = props.data;
        const inside = checkInsidePolys([lat, lng], polys);

        if (inside) {
            setPopCord({ lat: lat, lng: lng });
            return false;
        }

        if (popup) {
            return showPopup(false);
        }

        if (tempCords.length > 0) {
            const fCord = tempCords[tempCords.length - 1];
            const sCord = { lat: lat, lng: lng }
            const isIntersecting = checkIntersection(fCord, sCord, props.data);

            if (isIntersecting) {
                return false;
            }
        }

        if (canClick) {
            const cords = [...tempCords];
            const cord = { lat: lat, lng: lng }
            cords.push(cord);
            setTempCords(cords);
            _drawTempLines(cords);
        }
    }

    const _drawTempPoly = () => {
        var tempPolygon = new tempMaps.Polygon({
            paths: tempCords,
            strokeColor: color,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: color,
            fillOpacity: 0.35
        });
        if (tempPoly) {
            tempPoly.setMap(null);
        }
        tempPolygon.setMap(tempMap);
        setTempPoly(tempPolygon);
    }

    const _removeCord = (lat, lng) => {
        const cords = [...tempCords]
        const index = cords.findIndex((cord) => cord.lat === lat && cord.lng === lng);
        if (index !== -1) {
            cords.splice(index, 1);
            setTempCords(cords);
            _drawTempLines(cords);
        }
    }

    const _handlePoint = (lat, lng) => {
        const firstCord = tempCords[0];

        if (canClick) {
            if (lat !== firstCord.lat && lng !== firstCord.lng) {
                _removeCord(lat, lng)
            } else {
                if (tempCords.length > 2) {
                    const lCord = tempCords[tempCords.length - 1];
                    const isIntersecting = checkIntersection(firstCord, lCord, props.data);

                    if (isIntersecting) {
                        return false;
                    }

                    _drawTempPoly()
                    setClick(false);
                    setModal(true);
                } else {
                    _removeCord(lat, lng)
                }
            }
        }
    }

    const _handleZonesLoading = (map, maps) => {
        setMap(map);
        setMaps(maps);
        showPopup(false);

        const addListenersOnPolygon = (polygon, zone) => {
            maps.event.addListener(polygon, 'click', function () {
                showPopup(true);
                setPopupZone(zone);
            });
        }

        props.data.map((zone) => {
            const cords = convertCords(zone.points);
            var zoneDraw = new maps.Polygon({
                paths: cords,
                strokeColor: zone.color,
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: zone.color,
                fillOpacity: 0.35,
                clickable: true,
            });
            zoneDraw.setMap(map);
            addListenersOnPolygon(zoneDraw, zone);
            return zone
        })
    }

    return (
        <div className="Map">
            <GoogleMapReact
                key={props.data}
                onClick={_handleAddPoint}
                bootstrapURLKeys={{ key: "" }}
                center={props.center}
                defaultZoom={11}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => _handleZonesLoading(map, maps)}
            >
                {tempCords.map((cord, index) => (
                    <Pins
                        key={index}
                        do={() => _handlePoint(cord.lat, cord.lng)}
                        lat={cord.lat}
                        lng={cord.lng}
                    />))}
                {popup &&
                    <ZonePopup
                        lat={popCord.lat}
                        lng={popCord.lng}
                        zone={popupZone}
                        token={props.token}
                        setZones={props.setZones}
                    />}
            </ GoogleMapReact>
            <ZoneInfo
                openModal={openModal}
                handleCloseTemp={_handleCloseTemp}
                setColor={setColor}
                tempCords={tempCords}
                color={color}
                redrawPoly={_drawTempPoly}
                token={props.token}
                setModal={setModal}
                setZones={props.setZones}
            />
        </div>
    )
}

export default Map