    // Function to get URL parameter by name
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    // Function to track the event in Funnelytics
    function trackFunnelyticsAction() {
        window.funnelytics.events.trigger('Offer View', {
            offer: 'Consultation'
          });
		console.log("Funnelytics Offer View Action Tracked");
    }

    // Function to calculate remaining time and show button
    function checkAndDisplayButton() {
        // Get the 'wtime' parameter from the URL
        var wtimeParam = getParameterByName('wtime');
        var timeDifferenceInSeconds;

        if (wtimeParam) {
            // Extract minutes and seconds from the 'wtime' parameter
            var timeParts = wtimeParam.match(/(\d+)m(\d+)s/);
            if (timeParts && timeParts.length === 3) {
                var minutes = parseInt(timeParts[1], 10);
                var seconds = parseInt(timeParts[2], 10);

                // Calculate the remaining time in seconds
                var remainingTimeInSeconds = (minutes * 60) + seconds;

                // Set the threshold time (53 minutes in this example)
                var thresholdTimeInSeconds = 53 * 60;

                // Calculate the time difference
                timeDifferenceInSeconds = thresholdTimeInSeconds - remainingTimeInSeconds;
            }
        } else {
            // If there's no 'wtime' parameter, set the time difference to the default threshold time (53 minutes)
            timeDifferenceInSeconds = 53 * 60; // 53 minutes in seconds
        }

        if (timeDifferenceInSeconds >= 0) {
            // Wait for the time difference before showing the CTA button
            setTimeout(function () {
                document.getElementById('enroll-cta-section-2').style.display = 'block';
				document.getElementById('enroll-cta-section-3').style.display = 'block';
                console.log('CTA button displayed.');
                trackFunnelyticsAction();
            }, timeDifferenceInSeconds * 1000); // Convert seconds to milliseconds
        } else {
            // If the remaining time is past the threshold (or if the calculation somehow goes negative), show the CTA button immediately
            document.getElementById('enroll-cta-section-2').style.display = 'block';
			document.getElementById('enroll-cta-section-3').style.display = 'block';
            console.log('CTA button displayed immediately due to past threshold or no wtime.');
            trackFunnelyticsAction();
        }
    }

    // Call the function when the page loads
    window.addEventListener('DOMContentLoaded', checkAndDisplayButton);
