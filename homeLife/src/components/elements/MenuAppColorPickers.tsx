import { useEffect, useState } from 'react';
import {SketchPickerProps, RGBColor, SketchPicker} from 'react-color';
import { getCorrectDomain } from '../../AppSettings';

export const MenuAppColorPickers = ({ menuThemeColor, setMenuThemeColor }) => {
    const [areSketchPickersEnabled, setAreSketchPickersEnabled] = useState(false);
	// const rgbColor: RGBColor = {r: 82, g: 82, b: 82, a: 1};
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const rgbColor: RGBColor = {r: menuThemeColor[0], g: menuThemeColor[1], b: menuThemeColor[2], a: menuThemeColor[3]};
	const [sketchPickerColor, setSketchPickerColor] = useState(rgbColor);
    const [sketchHexColor, setSketchHexColor] = useState('#525252');
	const sketchSettings: SketchPickerProps = {
		width: "160px"
	}

    useEffect(() => {
        setSketchPickerColor(rgbColor);
    }, [menuThemeColor])

    function handleShowingSketchPickers() {
        setAreSketchPickersEnabled(!areSketchPickersEnabled);
    }

    // TODO: Enhance by utilizing complimentary colors.
    function invertColor(hex, bw) {
        if (hex.indexOf('#') === 0) {
            hex = hex.slice(1);
        }
        // convert 3-digit hex to 6-digits.
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        if (hex.length !== 6) {
            console.log(hex);
            
            throw new Error('Invalid HEX color.');
        }
        var r = parseInt(hex.slice(0, 2), 16),
            g = parseInt(hex.slice(2, 4), 16),
            b = parseInt(hex.slice(4, 6), 16);
        if (bw) {
            // https://stackoverflow.com/a/3943023/112731
            return (r * 0.299 + g * 0.587 + b * 0.114) > 186
                ? '#000000'
                : '#FFFFFF';
        }
        // invert color components
        var rStr = (255 - r).toString(16),
            gStr = (255 - g).toString(16),
            bStr = (255 - b).toString(16);
        // pad each with zeros and return
        return "#" + padZero(rStr, bw) + padZero(gStr, bw) + padZero(bStr, bw);
    }

    function padZero(str, len) {
        len = len || 2;
        var zeros = new Array(len).join('0');
        return (zeros + str).slice(-len);
    }

	return (
        <div className='color-scheme-switches'>
            <i className="fa-solid fa-palette" onClick={handleShowingSketchPickers} style={{color: `${invertColor(sketchHexColor, 0)}`}}></i>
            {areSketchPickersEnabled ? (
                <SketchPicker
                    {...sketchSettings}
                    onChange={(color) => {
                        setSketchPickerColor(color.rgb);
                        // Setup var to hold background css friendly rgb color
                        setMenuThemeColor(`rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`);
                        setSketchHexColor(color.hex);
                        // TODO: Store data in database
                        console.log(`{ "menuThemeColor": "rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})" }`);
                        
                        fetch(getCorrectDomain() + '/api/userpreferences/add', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                userId: JSON.parse(localStorage.getItem('user')).id,
                                userPreferences: `{ "menuThemeColor": "rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})" }`
                            })
                        }).then(function (response) {
                            if (response.ok) {
                                return response.json();
                            }
                            return Promise.reject(response);
                        }).then(function (data) {
                            console.log(JSON.stringify(data));
                        }).catch(function (error) {
                            console.warn('Something went wrong.', error);
                        });
                    }}
                    color={sketchPickerColor}
                />
            ) : (
                <></>
            )}
        </div>
	);
};
