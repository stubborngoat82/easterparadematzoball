# Website Integration Prompt: Easter Parade Matzo Ball Event Details

## Objective
Integrate the following event logistics and website elements into the existing Easter Parade Matzo Ball website, maintaining the vibrant design aesthetic and React application structure.

---

## EXTRACTED CONTENT TO INTEGRATE

### Event Logistics (Image 1)

**PARADE ROUTE & TIMING:**
- Parade Route: 3 PM to 4 PM
- Post Parade Games: 4 PM to 6 PM

**WEBSITE USAGE:**
- Use the website for regular updates
- Send friends to the website
- Note: No social media, advertising, or publicity until afterward
- This is person-to-person invitations only
- There is no master list

**DONATIONS:**
- Question noted: "Can we have a Donation portal?"
- Action item: Consider implementing donation functionality

**GETTING TO THE ABBEY:**
- Recommended transportation: Light Rail, Uber, Lyft, or Waymo
- Parking options:
  - On-street parking available
  - City garage open for a fee

---

### Website Elements (Image 2)

**MAIN EVENT INFORMATION:**
- Event Name: Easter Parade/Matzo Ball
- Presented by: The Abbey
- Tag line: "The Ultimate Not-Necessarily-Annual Easter Parade & Matzo Ball. It's Free."

**HONOREES:**
- We Honor: Estelle Speros MacDonald and Jana Bommersbach

**EVENT DESCRIPTION COMPONENTS:**
- "THE ABBEY: description" (needs content)
- "THE Easter Parade/Matzo Ball History: WHAT IS IT?" (needs historical content)

**PARTICIPANT ENGAGEMENT:**
- "Update your look!"
- "Be the Person you've want to be!"
- "Create Skull Sculpture!"

**HAT REQUIREMENT & HAT MAKING EVENTS:**
- **Mandatory:** Everyone must wear a hat!!
- Hat Making Events in partnership with:
  - ASU School of Fashion & Design
  - Walter's Productions
- Description: "Another once in a lifetime opportunity: make your own hat"
- Activities:
  - Gather your friends and create a hat brigade
  - Bring your old hat and give it a fresh look
- Note: "HAT MAKING EVENT DATES:" (specific dates need to be added)

---

## INTEGRATION INSTRUCTIONS

### 1. **Create New Page Sections**

#### A. Event Schedule Page/Section
- Add detailed timeline with visual representation
- Parade Route (3-4 PM) - could include map or route visualization
- Post Parade Games (4-6 PM) - describe game activities
- Use icons or timeline component for visual appeal

#### B. Getting There Page/Section
- Transportation options with icons:
  - Light Rail (with route info if available)
  - Rideshare (Uber, Lyft, Waymo)
  - Parking information (street + city garage)
- Consider adding embedded map of The Abbey location
- Add transportation tips

#### C. Hat Making Events Section
- Prominent placement (this is a key engagement element)
- Partnership logos/credits: ASU School of Fashion & Design, Walter's Productions
- Event dates calendar (to be populated)
- Call to action: "Make your own hat"
- Engagement copy: "Gather your friends and create a hat brigade"
- Photo gallery placeholder for hat-making event photos

#### D. Honorees Section
- Dedicated section honoring:
  - Estelle Speros MacDonald
  - Jana Bommersbach
- Consider biographical information and photos
- Explanation of why they're being honored

#### E. About/History Section
- "What is the Easter Parade/Matzo Ball?" historical context
- The Abbey venue description
- Event tradition and significance
- Could include archived photos from previous events

#### F. Activities Section
- Skull Sculpture creation
- "Update your look" transformation element
- "Be the Person you've want to be" theme
- Hat wearing requirement and creative expression

### 2. **Homepage Updates**
- Add prominent tagline: "The Ultimate Not-Necessarily-Annual Easter Parade & Matzo Ball. It's Free."
- Add "Presented by The Abbey"
- Emphasize the FREE admission
- Include date and time prominently

### 3. **Consider Adding:**

#### Donation Portal
- Based on the question in the source material
- Could be integrated PayPal, Stripe, or similar
- Optional donation with suggested amounts
- Explanation of where donations go

#### Updates/News Section
- Since website is for "regular updates"
- Could be a blog-style section or announcements feed
- Social sharing encouragement (for friends to share the website)

#### Invitation Management
- Since it's person-to-person invitations
- Could add "Share this site" functionality
- Email invitation template generator

### 4. **Navigation Structure Recommendation**
- Home
- About The Event (history, what is it)
- Schedule (timeline, parade route, games)
- Hat Making Events (dates, locations, partners)
- Getting There (transportation, parking, directions)
- The Abbey (venue description)
- Honorees (Estelle & Jana)
- Activities (skull sculpture, transformation, etc.)
- Donate (if portal is created)
- Updates/News

### 5. **Design Consistency Notes**
- Maintain the vibrant, celebratory aesthetic from existing site
- Use bold colors consistent with Easter/spring theme
- Ensure mobile responsiveness for all new sections
- Add appropriate imagery for each section
- Use consistent typography and spacing

### 6. **Content Gaps to Fill**
The following content is referenced but needs to be created:
- The Abbey venue description
- Full historical context of the event
- Hat Making Event specific dates
- Honorees biographical information
- Post Parade Games details
- Skull Sculpture activity details

### 7. **Technical Implementation Notes**
- Add React Router routes for new pages
- Create reusable components (Timeline, TransportOption, ActivityCard, etc.)
- Ensure email integration for contact/updates remains functional
- Add meta tags and SEO for each new page
- Consider adding an event calendar component for hat-making dates

---

## PRIORITY IMPLEMENTATION ORDER

1. **High Priority:**
   - Schedule/Timeline (parade route, post-parade games)
   - Hat Making Events section (key engagement activity)
   - Getting There information (practical necessity)
   - Main event tagline and free admission notice

2. **Medium Priority:**
   - Honorees section
   - About/History section
   - Activities section (skull sculpture, etc.)
   - Donation portal (pending decision)

3. **Lower Priority:**
   - Updates/News section
   - Enhanced sharing features
   - Photo galleries

---

## MESSAGING GUIDELINES

Based on source material, emphasize:
- ✅ Website as primary communication channel
- ✅ Person-to-person invitation model
- ✅ Event is FREE
- ✅ Hat wearing is MANDATORY
- ✅ Creative expression and transformation themes
- ❌ NO social media advertising until after event
- ❌ NO publicity until after event
- ❌ NO master invitation list

---

## QUESTIONS FOR CLIENT

Before implementation, clarify:
1. Should we implement a donation portal? If yes, what payment processor?
2. What are the specific Hat Making Event dates?
3. Do you have biographical content for the honorees?
4. Do you have The Abbey venue description content?
5. Do you have historical context/photos from previous events?
6. What are the specific Post Parade Games activities?
7. Do you have details on the Skull Sculpture activity?
8. Do you have a map or specific details about the parade route?
9. Should there be a photo gallery section?
10. Do you need RSVP tracking or just informational website?

---

## RESPONSIVE DESIGN CONSIDERATIONS

Ensure all new sections work well on:
- Desktop (full navigation, side-by-side layouts)
- Tablet (adjusted layouts, collapsible sections)
- Mobile (stacked layouts, simplified navigation, easy-to-tap buttons for transportation options)

---

## ACCESSIBILITY NOTES

- Ensure all new content meets WCAG 2.1 AA standards
- Add alt text for all images
- Ensure color contrast ratios are sufficient
- Make navigation keyboard-accessible
- Add ARIA labels where appropriate