import React from 'react'

import CardHistory from '../component/CardHistory';
function History() {
    return(
        <div>
            <h1 className="text-2xl font-bold">History</h1>

            <div class="grid md:grid-cols-2 gap-10 lg:grid-cols-4 gap-10 place-items-center">
            {/* CardHistory Components Hardcoded */}
            <CardHistory />

            <CardHistory />

            <CardHistory />

            <CardHistory />

            <CardHistory />

            <CardHistory />

            <CardHistory />

            <CardHistory />


            </div>
        </div>

        
    )
}

export default History