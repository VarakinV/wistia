document.addEventListener('DOMContentLoaded', function() {
    var userTags = phpVars.userTags;
    var contactId = phpVars.contactId;
    console.log(userTags, contactId);

    // Mapping of tag IDs to wtime values for watch tags
    const tagIdToWtimeMapping = {
        377: '03m03s',   // 5%
        379: '06m06s',   // 10%
        381: '09m10s',   // 15%
        383: '12m13s',  // 20%
        385: '15m16s',  // 25%
        387: '18m20s',  // 30%
        389: '21m23s',  // 35%
        391: '24m26s',  // 40%
        393: '27m30s',  // 45%
        395: '30m33s',  // 50%
        397: '33m36s',  // 55%
        399: '36m40s',  // 60%
        401: '39m43s',  // 65%
        403: '41m46s',  // 70%
        405: '44m50s',  // 75%
        407: '47m53s',  // 80%
        409: '50m56s',  // 85%
        411: '54m00s',  // 90%
        413: '57m03s'   // 95%
    };

    function determineHighestWatchTime(userTags, mapping) {
        let highestTime = '';
        userTags.forEach(tagId => {
            if (mapping[tagId] && (!highestTime || mapping[tagId] > highestTime)) {
                highestTime = mapping[tagId];
            }
        });
        return highestTime;
    }

    const watchTags = userTags.filter(tagId => tagId in tagIdToWtimeMapping);
    const wtime = determineHighestWatchTime(watchTags, tagIdToWtimeMapping);

    const baseUrl = 'https://drbotelho.com/lp/diabetes-is-reversible/broadcast/';
    let redirectUrl = baseUrl;

    // Check if a valid wtime is found, append parameters accordingly
    if (wtime) {
        redirectUrl += `?contactId=${contactId}&wtime=${wtime}`;
    } else {
        // If no valid wtime, only append contactId
        redirectUrl += `?contactId=${contactId}`;
    }

    console.log("Redirecting to:", redirectUrl); // For debugging purposes
    //use actual URL
    //window.location.href = redirectUrl;
});

