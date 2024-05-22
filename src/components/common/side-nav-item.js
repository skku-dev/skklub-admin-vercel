import Link from "next/link";
import { Box, ButtonBase } from "@mui/material";
import styled from "@emotion/styled";

const NavButton = styled(ButtonBase)`
  align-items: center;
  border-radius: 1px;
  display: flex;
  justify-content: flex-start;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 6px;
  padding-bottom: 6px;
  text-align: left;
  width: 100%;

  &:hover {
    background-color: rgba(255, 255, 255, 0.04);
    border-radius: 5px;
  }

  ${(props) =>
    props.active === "true" && {
      backgroundColor: "rgba(255, 255, 255, 0.04)",
    }}
`;

const IconBox = styled(Box)`
  align-items: center;
  color: ${(props) =>
    props.active === "true"
      ? (props) => props.theme.palette.primary.main
      : (props) => props.theme.palette.neutral[400]};
  display: inline-flex;
  justify-content: center;
  margin-right: 16px;
`;

const TitleBox = styled(Box)`
  color: ${(props) => {
    if (props.active === "true") return "#fff";
    if (props.disabled) return (props) => props.theme.palette.neutral[500];
    return (props) => props.theme.palette.neutral[400];
  }};
  flex-grow: 1;
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
  white-space: nowrap;
`;

export const SideNavItem = (props) => {
  const { active = "false", disabled, external, icon, path, title } = props;

  const linkProps = path
    ? external
      ? {
          component: "a",
          href: path,
          target: "_blank",
        }
      : {
          component: Link,
          href: path,
        }
    : {};

  return (
    <li>
      <NavButton {...linkProps}>
        {icon && (
          <IconBox component="span" active={active}>
            {icon}
          </IconBox>
        )}
        <TitleBox component="span" active={active} disabled={disabled}>
          {title}
        </TitleBox>
      </NavButton>
    </li>
  );
};
