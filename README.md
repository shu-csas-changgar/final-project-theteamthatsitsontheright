# ABC Corp Device Tracker
By Davis Cook, Josephine Des Rosiers, Shamil Dzhatdoyev, and Jeremy Suero

## Manual
Use of the website should be relatively straightforward. The use of each tab will be outlined below:
* **Employees:** View all of the employees employed by ABC Corp. Clicking the view tab on the employee allows you to see the name of the employee, their email, their phone number, the office that they work in, and their ID number.
* **Equipment:** View all of the equipment owned by ABC Corp and where it is located. You are also able to add and delete equipment from this tab. Employees are also able to claim equipment in this tab if they are logged in.
* **Reservations:** View all of the room reservations across all of ABC Corp. You are also able to filter by name and room ID. Finally you can add and delete reservations from this tab.
* **Login:** Employees are able to login on this page.
* **Register:** New users are able to register on this page.

## Documentation
* **City:** List of all of the cities that we have offices or vendors in. Uses ID and Name.
* **Contract Type:** List of the different contract types that we have with our vendors. Uses ID and Type.
* **Country:** List of countries we have offices in. Uses ID and Name
* **Employee:** List of all employees we have. Stores their first and last name, email, password, phone number, office ID (which joins to the office table), and if the employee is active or not. Also shows last update.
* **Equipment:** List of all of the equipment owned by ABC Corp. Stores the equipment name, vendor ID (which joins to the vendor table), the employee that owns the equipment (joins on Employee ID), equipment type ID (joins to the table of the same name), contract type ID (also joins to the table of the same name), office ID of the office the equipment is located at, the expiration date of the lease (if there is one), and the last update for the equipment.
* **Equipment Reservation:** Joins equipment and reservation tables allowing for equipment to be reserved for a meeting.
* **Equipment Type:** Lists the diffpeserent ty of equipment. Uses ID and Type.
* **Location:** Lists of all the locations that we have either offices or vendors. Has a name, address, city ID (joins to the city table), state ID (joins to the state table), country ID (joins to country table), and zip code.
* **Office:** List of all the offices that we have. Each office has a name, number of floors, and location ID (joins to location table).
* **Reservation:** List of all reservations that happed at ABC Corp. Each has an ID, Name, room ID (joins to room table), start time, and end time.
* **Room:**  Each room has its own unique ID, floor number, max attendees, if it is use, smart enabled, and office ID (joins to office table).
* **State:** List of all states for addresses. Has an ID and Name.
* **Vendor:** List of all vendors we have. Has a name and a location Id (joins to location table).
* ***Why we chose this schema:*** we wanted to abstract as much data out as possible (state having its own table) so that confusion would be as minimal as possible.

## Considerations for the future
Currently we do not have working updates for our employees and we do not have a way to add vendors. This is something we plan to add in the future. We also plan on adding encryption for passwords, and implementing a better system for creating emails from names. This could include allowing people to sign up with their own emails which would be a small change to the employee table. We could also add a logIn table which includes the employee_id, for ease of access
