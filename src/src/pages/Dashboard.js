import React, { useState } from 'react';

import BackgroundLayer from '../components/BackgroundLayer';
import ListCallsLayer from '../components/ListCallsLayer';
import PersonalizatePage from '../components/PersonalizateLayer';
import BackgroundPoupupLayer from '../components/BasePoupupLayer';

export default function Dashboard({ isPersonalizatePage }) {
    const [isPoupupActive, setPoupupActive] = useState(false);
    const [poupupComponent, setPoupupComponent] = useState(null);

    return (
        <>
            <BackgroundPoupupLayer display={isPoupupActive} component={poupupComponent} />
            <BackgroundLayer hasFoward={!isPersonalizatePage} />
            {
                isPersonalizatePage ?
                <PersonalizatePage />
                :
                <ListCallsLayer changePoupupState={setPoupupActive} changePoupupComponent={setPoupupComponent} />
            }
        </>
    );
}