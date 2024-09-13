// Tanner Fry
// Private route component is used to perform user validation to make sure they are logged into before showing the
// components children. For example usage, see src/App.js.

import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../AppHooks";
import { APIPOSTSubscriptionsFeatureAuth } from "../../api/Common";
import Loading from "../elements/Loading";
import { Link } from "react-router-dom";

interface ISecurityClearanceProps {
    featureType: AppFeatureType;
    subFeatureType?: AppSubFeatureType;
    feature: React.ReactNode;
    noClearanceNote?: JSX.Element;
    noClearanceImage?: JSX.Element;
    callback?: () => void;
}

export enum AppFeatureType {
    Dashboard = 'Dashboard',
    Animals = 'Animals',
    Cooking = 'Cooking',
    Gardening = 'Gardening',
    GasGuzzler = 'GasGuzzler',
    HealthAndWellness = 'HealthAndWellness',
    Maintenance = 'Maintenance',
    Notes = 'Notes',
    News = 'News',
    Weather = 'Weather',
}

export enum AppSubFeatureType {
    DashboardWorktimes = 'DashboardWorktimes',
    DashboardTasks = 'DashboardTasks',
    DashboardBills = 'DashboardBills',
    GardeningWiki = 'GardeningWiki',
    GardeningLayoutBuilder = 'GardeningLayoutBuilder',
    WeatherData = 'WeatherData',
    WeatherRadar = 'WeatherRadar',
    NotesUnencrypted = 'NotesUnencrypted',
    NotesEncrypted = 'NotesEncrypted',
}

interface IClearanceResponse {
    result: string;
    data: {
        isCleared: boolean,
        limit: number,
    }
}

function SecurityClearance({featureType, subFeatureType, feature, noClearanceNote, noClearanceImage, callback}: ISecurityClearanceProps): JSX.Element {
    const [hasClearanceForFeature, setHasClearanceForFeature] = useState(false);
    const [isLoadingClearance, setIsLoadingClearance] = useState(true);
    const userPlan = useAppSelector(state => state.users.subscriptionPlan);

    useEffect(() => {
        // Check what plan the user has and if they have clearance for the feature        
        const hasClearance = async (featureType: AppFeatureType, subFeatureType: AppSubFeatureType) => {       
            setIsLoadingClearance(true);    
            const clearanceResponse: IClearanceResponse = await APIPOSTSubscriptionsFeatureAuth(JSON.parse(localStorage.getItem('user')).id, AppFeatureType[featureType], AppSubFeatureType[subFeatureType]);
            if (clearanceResponse.data.isCleared) {
                setHasClearanceForFeature(true);
            } else {
                setHasClearanceForFeature(false);
            }

            if (clearanceResponse.data.limit > 0) {
                // TODO: Set limit in redux so other components can use it
                // CONT: We can set the limit based on the feature type and subfeature type
            }

            setIsLoadingClearance(false);
            // Some pages might have rendering issues with canvas objects so we have a callback that can be used to check
            // for re-rendering on the previous component. Check Weather forecast chart for an example.
            callback && callback();
        };

        hasClearance(featureType, subFeatureType);
    }, []);

    return hasClearanceForFeature ? (
        <>
            {isLoadingClearance ? (
                <Loading />
            ) : (
                <>
                    {feature ? feature : <>No children</>}
                </>
            )}
        </>
    ) : (
        <>
            {isLoadingClearance ? (
                <Loading />
            ) : (
                <>
                    <div className="no-clearance-note">
                        <div className="no-clearance-wrapper">
                            <p>Upgrade to the <Link to="/pricing">Base or Packed</Link> plan to get access to {noClearanceNote ? noClearanceNote : <> feature</>}</p>
                            {noClearanceImage ? noClearanceImage : <></>}
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default SecurityClearance;