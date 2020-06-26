

export const filterEvents2 = (parsed_events, eventLevel) => {

    console.log("filterEvents...eventLevel:", eventLevel + ' events:', parsed_events)
    let myEvents = parsed_events.filter((event) => {

        console.log("filtering", event.sev)
        return (event.sev <= eventLevel)

    })
    console.log("myEvents:", myEvents)
    return myEvents
}