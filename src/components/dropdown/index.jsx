import { Dropdown as DropdownComponent } from "react-bootstrap";
import "./dropdown.scss";
function Dropdown({ item, vertical = false }) {
  return (
    <DropdownComponent>
      <DropdownComponent.Toggle
        variant="link"
        id="profile-dropdown"
        className="p-0 border-0 text-end"
        bsPrefix="dropdown-toggle-no-caret"
      >
        {vertical ? (
          <i className="bi bi-three-dots-vertical"></i>
        ) : (
          <i className="bi bi-three-dots"></i>
        )}
      </DropdownComponent.Toggle>

      <DropdownComponent.Menu align="end" className="dropdown-menu">
        {item.map((option, index) => (
          <DropdownComponent.Item
            key={index}
            as="button"
            onClick={option.action}
          >
            {option.label}
          </DropdownComponent.Item>
        ))}
      </DropdownComponent.Menu>
    </DropdownComponent>
  );
}

export default Dropdown;
