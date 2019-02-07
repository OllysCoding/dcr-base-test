import React from 'react';

export interface AnalyticsModel {
    gaTracker: string;
    title: string;
    fbPixelaccount: string;
    comscoreID: string;
    section: string;
    contentType: string;
    id: string;
    beacon: string;
    neilsenAPIID: string;
    domain: string;
}

export const Analytics: React.FC<{
    analytics: AnalyticsModel;
}> = ({
    analytics: {
        gaTracker,
        fbPixelaccount,
        comscoreID,
        title,
        section,
        contentType,
        id,
        beacon,
        neilsenAPIID,
        domain,
    },
}) => {
    const scripts: string[] = [
        `<amp-pixel src="${beacon}"></amp-pixel>`,
        `<amp-pixel src="//www.facebook.com/tr?id=${fbPixelaccount}&ev=PageView&noscript=1"></amp-pixel>`,
        `<amp-analytics config="https://ophan.theguardian.com/amp.json" data-credentials="include" ></amp-analytics>`,
        `<amp-analytics type="googleanalytics" id="google-analytics">
             <script type="application/json">
               {
                 "requests": {
                   "pageviewWithCustomDims": "\${pageview}&cd3=\${platform}&cd4=\${sectionId}&cd5=\${contentType}&cd6=\${commissioningDesks}&cd7=\${contentId}&cd8=\${contributorIds}&cd9=\${keywordIds}&cd10=\${toneIds}&cd11=\${seriesId}&cd26=\${isHostedFlag}&cd29=\${fullRequestUrl}"
                 },
                 "vars": {
                   "account": "${gaTracker}"
                 },
                 "triggers": {
                   "trackPageview": {
                     "on": "visible",
                     "request": "pageviewWithCustomDims",
                     "vars": {
                       "title": "${title}",
                       "platform": "AMP",
                       "sectionId": "${section}",
                       "contentType": "${contentType}",
                       "contentId": "${id}",
                       "isHostedFlag": "true",
                       "fullRequestUrl": "${domain}/${id}"
                     }
                   }
                 }
               }
               </script>
            </amp-analytics>`,
        `<amp-analytics id="comscore" type="comscore">
            <script type="application/json">
                {
                    "vars": {"c2": "${comscoreID}"},
                    "extraUrlParams": {"comscorekw": "amp"}
                }
            </script>
        </amp-analytics>`,
        `<amp-analytics type="nielsen">
             <script type="application/json">
                {
                    "vars": {
                        "apid": "${neilsenAPIID}",
                        "apv": "1.0",
                        "apn": "The Guardian",
                        "section": "${section}",
                        "segC": "Guardian - Google AMP"
                    }
                }
            </script>
        </amp-analytics>`,
    ];

    // tslint:disable-next-line:react-no-dangerous-html
    return <div dangerouslySetInnerHTML={{ __html: scripts.join('\n') }} />;
};
