export function franchiseWhatsAppUrl(fields) {
  const value=key=>String(fields[key]??'').trim();
  const lines=[
    'LEE LABAN — FRANCHISE ENQUIRY','',
    `Name: ${value('name')}`,`Phone: ${value('phone')}`,`Email: ${value('email')||'Not provided'}`,
    `Current city: ${value('city')}`,`Occupation / business: ${value('occupation')||'Not provided'}`,
    `Owned a business before: ${value('experience')||'Not specified'}`,
    `Franchise experience: ${value('franchiseExperience')||'Not specified'}`,'',
    'PROPOSED LOCATION',`City: ${value('proposedCity')}`,`Preferred area: ${value('area')}`,
    `Commercial space: ${value('space')||'Not specified'}`,`Area (sq ft): ${value('size')||'Not provided'}`,
    `Location / frontage: ${value('frontage')||'Not provided'}`,
    `Additional details: ${value('message')||'None'}`,'',
    'Please share the next steps for opening a Lee Laban franchise.'
  ];
  return 'https://wa.me/919108664784?text='+encodeURIComponent(lines.join('\n'));
}
