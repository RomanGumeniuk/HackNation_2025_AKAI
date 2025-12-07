export const nodes = [
    {
        id: 'initiator-president',
        label: 'Prezydent RP',
        size: 18,
        fill: '#394788'
    },
    {
        id: 'initiator-government',
        label: 'Rada Ministrów',
        size: 18,
        fill: '#394788'
    },
    {
        id: 'initiator-senate',
        label: 'Senat RP',
        size: 18,
        fill: '#394788'
    },
    {
        id: 'initiator-deputies',
        label: 'Posłowie',
        size: 18,
        fill: '#394788'
    },
    {
        id: 'initiator-citizens',
        label: 'Obywatele',
        size: 18,
        fill: '#394788'
    },
    {
        id: 'sejm-reading-1',
        label: 'Sejm - I Czytanie',
        size: 22
    },
    {
        id: 'sejm-committee',
        label: 'Sejm - Komisja',
        size: 22
    },
    {
        id: 'sejm-reading-2',
        label: 'Sejm - II Czytanie',
        size: 22
    },
    {
        id: 'sejm-committee-2',
        label: 'Sejm - Komisja (poprawki)',
        size: 18
    },
    {
        id: 'sejm-reading-3',
        label: 'Sejm - III Czytanie',
        size: 22,
        fill: '#5B8FA3'
    },
    {
        id: 'senat-committee',
        label: 'Senat - Komisja',
        size: 22
    },
    {
        id: 'senat-decision',
        label: 'Senat - Decyzja',
        size: 22,
        fill: '#5B8FA3'
    },
    {
        id: 'sejm-veto-review',
        label: 'Sejm - Weto Senatu',
        size: 18,
        fill: '#DC2626'
    },
    {
        id: 'president-signature',
        label: 'Prezydent',
        size: 22,
        fill: '#5B8FA3'
    },
    {
        id: 'president-veto',
        label: 'Prezydent - Weto',
        size: 18,
        fill: '#DC2626'
    },
    {
        id: 'president-tribunal',
        label: 'Trybunał Konstytucyjny',
        size: 18,
        fill: '#E07A5F'
    },
    {
        id: 'sejm-override',
        label: 'Sejm - Odrzucenie Weta',
        size: 18,
        fill: '#DC2626'
    },
    {
        id: 'publication',
        label: 'Publikacja',
        size: 22,
        fill: '#2F855A'
    },
];

export const edges = [
    { id: '0a', source: 'initiator-president', target: 'sejm-reading-1' },
    { id: '0b', source: 'initiator-government', target: 'sejm-reading-1' },
    { id: '0c', source: 'initiator-senate', target: 'sejm-reading-1' },
    { id: '0d', source: 'initiator-deputies', target: 'sejm-reading-1' },
    { id: '0e', source: 'initiator-citizens', target: 'sejm-reading-1' },
    { id: '2', source: 'sejm-reading-1', target: 'sejm-committee' },
    { id: '3', source: 'sejm-committee', target: 'sejm-reading-2' },
    { id: '3a', source: 'sejm-reading-2', target: 'sejm-committee-2' },
    { id: '3b', source: 'sejm-committee-2', target: 'sejm-reading-3' },
    { id: '4', source: 'sejm-reading-2', target: 'sejm-reading-3' },
    { id: '5', source: 'sejm-reading-3', target: 'senat-committee' },
    { id: '6', source: 'senat-committee', target: 'senat-decision' },
    { id: '7', source: 'senat-decision', target: 'president-signature' },
    { id: '8', source: 'senat-decision', target: 'sejm-veto-review' },
    { id: '9', source: 'sejm-veto-review', target: 'president-signature' },
    { id: '11', source: 'president-signature', target: 'publication' },
    { id: '12', source: 'president-signature', target: 'president-veto' },
    { id: '13', source: 'president-veto', target: 'sejm-override' },
    { id: '14', source: 'sejm-override', target: 'president-signature' },
    { id: '15', source: 'president-signature', target: 'president-tribunal' },
    { id: '16', source: 'president-tribunal', target: 'president-signature' },
];
