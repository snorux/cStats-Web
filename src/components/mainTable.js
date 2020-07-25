import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const Table  = ( {data} ) => {
    const columns = [{
        dataField: "id",
        text: "Rank",
        headerAlign: 'center',
        style: { 'whiteSpace': 'nowrap', overflow: 'hidden' },
        headerStyle: { width: '5%' },
        headerAttrs: () => ({
            tabIndex: "false"
        }),
        formatter: iconFormatter
    }, {
        dataField: "personaname",
        text: "Name",
        headerAlign: 'center',
        style: { 'whiteSpace': 'nowrap', overflow: 'hidden' },
        headerStyle: { width: '20%' },
        headerAttrs: () => ({
            tabIndex: "false"
        }),
        formatter: iconFormatter
    }, {
        dataField: "steamid64",
        text: "SteamID64",
        headerAlign: 'center',
        style: { 'whiteSpace': 'nowrap', overflow: 'hidden' },
        headerStyle: { width: '20%' },
        headerAttrs: () => ({
            tabIndex: "false"
        }),
        formatter: iconFormatter
    }, {
        dataField: "points",
        text: "Points",
        headerAlign: 'center',
        style: { 'whiteSpace': 'nowrap', overflow: 'hidden', textAlign: 'center'},
        headerStyle: { width: '20%' },
        headerAttrs: () => ({
            tabIndex: "false"
        }),
        formatter: iconFormatter
    }];

    function iconFormatter(cell, row) {
        if (row.counter === 0) {
            return (
                <span style={{color: "#ffd700"}}>{cell}</span>
            );
        } else if (row.counter === 1) {
            return (
                <span style={{color: "#c0c0c0"}}>{cell}</span>
            )
        } else if (row.counter === 2) {
            return (
                <span style={{color: "#cd7f32"}}>{cell}</span>
            )
        }
        return (
            <span>{cell}</span>
        );
    }

    // https://stackoverflow.com/a/52387803
    function secondsToDhms(seconds) {
        seconds = Number(seconds);
        var d = Math.floor(seconds / (3600*24));
        var h = Math.floor(seconds % (3600*24) / 3600);
        var m = Math.floor(seconds % 3600 / 60);
        var s = Math.floor(seconds % 60);
        
        var dDisplay = d > 0 ? d + "d ": "";
        var hDisplay = h > 0 ? h + "h " : "";
        var mDisplay = m > 0 ? m + "m " : "";
        var sDisplay = s > 0 ? s + "s" : "";
        return dDisplay + hDisplay + mDisplay + sDisplay;
    }

    const cstatdata = data.map((cstat, index) => {
        return ({
            id: cstat.Rank ? cstat.Rank : index + 1,
            personaname: cstat.personaname,
            points: cstat.points,
            steamid64: <div><a href={"http://steamcommunity.com/profiles/" + cstat.steamid64} target="_blank" rel="noopener noreferrer" key={index + 1}>{cstat.steamid64}</a></div>,
            totalTime: secondsToDhms(cstat.human_time + cstat.zombie_time),
            counter: index
            }
        )
    })

    // Expanding rows has this issue: https://github.com/react-bootstrap-table/react-bootstrap-table2/pull/1289
    // https://github.com/react-bootstrap-table/react-bootstrap-table2/issues/912
    const expandRow = {
        renderer: row => (
            <div>
                <table width='100%' cellSpacing="0" cellPadding="0" className="table-opener">
                    <tbody>
                        <tr>
                            <td className="table-opener-header" align="left" colSpan="3">
                                <b>cStat Details: {data[row.counter].personaname}</b>
                            </td>
                        </tr>
                        <tr align="left">
                            <td width="30%" className="table-listing">Total Time: </td>
                            <td className="table-listing">{cstatdata[row.counter].totalTime}</td>
                            <td className="table-listing-2" width="30%" rowSpan="10">
                                <img src={data[row.counter].avatarURL} alt="" width="150px"></img>
                            </td>
                        </tr>
                        <tr align="left">
                            <td width="30%" className="table-listing">Human Time: </td>
                            <td className="table-listing">{secondsToDhms(data[row.counter].human_time)}</td>
                        </tr>
                        <tr align="left">
                            <td width="30%" className="table-listing">Zombie Time: </td>
                            <td className="table-listing">{secondsToDhms(data[row.counter].zombie_time)}</td>
                        </tr>
                        <tr align="left">
                            <td width="30%" className="table-listing">Zombies Killed: </td>
                            <td className="table-listing">{data[row.counter].zombie_killed}</td>
                        </tr>
                        <tr align="left">
                            <td width="30%" className="table-listing">Zombies Killed (HS): </td>
                            <td className="table-listing">{data[row.counter].headshot}</td>
                        </tr>
                        <tr align="left">
                            <td width="30%" className="table-listing">Infected: </td>
                            <td className="table-listing">{data[row.counter].infected_time + " players"}</td>
                        </tr>
                        <tr align="left">
                            <td width="30%" className="table-listing">Items picked up: </td>
                            <td className="table-listing">{data[row.counter].item_usage}</td>
                        </tr>
                        <tr align="left">
                            <td width="30%" className="table-listing">Boss Killed: </td>
                            <td className="table-listing">{data[row.counter].boss_killed}</td>
                        </tr>
                        <tr align="left">
                            <td width="30%" className="table-listing">Leader Count: </td>
                            <td className="table-listing">{data[row.counter].leader_count}</td>
                        </tr>
                        <tr align="left">
                            <td width="30%" className="table-listing">TopDefender Count: </td>
                            <td className="table-listing">{data[row.counter].td_count}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        ),
        // showExpandColumn: true,
        // expandByColumnOnly: true,
        // expandColumnPosition: 'right'
    };

    const paginationOption = {
        paginationSize: 4,
        pageStartIndex: 1,
        hideSizePerPage: true,
        prePageText: '<',
        nextPageText: '>',
        nextPageTitle: 'Next Page',
        prePageTitle: 'Previous Page',
        firstPageTitle: 'First Page',
        lastPageTitle: 'Last Page',
        showTotal: true,
        sizePerPage: 15
    };

    return (
        <BootstrapTable 
        keyField="id" 
        data={cstatdata} 
        columns={columns} 
        pagination={ paginationFactory(paginationOption) } 
        bordered={false}
        wrapperClasses="table-responsive"
        expandRow={ expandRow }
        />
    )
}

export default Table;