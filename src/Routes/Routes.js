import React from 'react';
import {
  Link
} from "react-router-dom";

function Routes() {
  return (
      <div>
        <nav>
          <ul>
            <li>
              <Link active = "ActiveMenu" to="/users">Users</Link>
            </li>
            <li>
              <Link active = "ActiveMenu" to="/messages">Messages</Link>
            </li>          
          </ul>
        </nav>
      </div>
  );
}

export default Routes;
