import styled from "@emotion/styled";
import { TabContext, TabPanel } from "@mui/lab";
import { Box, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { Control, useController, UseFormReturn } from "react-hook-form";
import { Size, Version, UserCustomizations } from "../../api/themes";
export interface VersionPickerProps {
    versions: Array<Version>;
    sizes: Array<Size>;
    form?: UseFormReturn<UserCustomizations, object>;
}

/**
 * Gets versio
 * @param versions
 * @param ids
 * @param layer
 * @returns
 */
function getVersion(
    versions: Array<Version>,
    ids: Array<number>,
    layer: number
): Version | undefined {
    let parent: Version | undefined = undefined;
    for (let i = 0; i < ids.length; i++) {
        const currentId = ids[i];
        // Edge case when parent is not found
        if (i === 0) {
            parent = versions.find((item) => item.id === currentId);
            if (parent === undefined) {
                return undefined;
            }
        } else if (i >= layer) {
            return parent;
        } else {
            // Find child of the prev parent
            parent = parent!.children.find((item) => item.id === currentId);
        }
    }
    return parent;
}

function GetBottomVersion(
    versions: Array<Version>,
    ids: Array<number>
): Version | null {
    // if version exist
    if (ids.length > 0 && versions.length > 0) {
        // Get stuff
        let id = ids[0];
        let idsCopy = ids.filter((x, i) => i !== 0);

        let version = versions.find((item) => item.id === id);

        if (version) {
            if (version.children.length > 0 && idsCopy.length > 0) {
                return GetBottomVersion(version.children, idsCopy);
            } else {
                return version;
            }
        }
    } else {
        return null;
    }
    return null;
}

function SelectDefaultChildren(version: Version): Array<number> {
    let children = version.children;
    // TODO: Change the field
    let defaultId: number | undefined = undefined;
    if (children.length > 0) {
        if (defaultId !== undefined) {
            let currentVersion = children.find((item) => item.id === defaultId);
            if (currentVersion) {
                if (currentVersion.children.length > 0) {
                    let bottomVersions = SelectDefaultChildren(currentVersion);
                    return [currentVersion.id, ...bottomVersions];
                }
                return [currentVersion.id];
            } else {
                return [children[0].id];
            }
        } else {
            return [children[0].id];
        }
    } else {
        return [];
    }
}
const CustomTabs = styled(Tabs)`
    .MuiTabs-flexContainer {
        justify-content: space-around;
    }
`

const CustomTab = styled(Tab)`
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    text-transform: none;

`
export function VersionPicker({ versions, sizes, form }: VersionPickerProps) {
    const [selectedTab, setSelectedTab] = useState("");
    const [selectedVersion, setSelectedVersion] = useState<Array<number>>([]);

    function handleTabChange(e: any, value: string) {
        console.log(selectedVersion);
        setSelectedTab(value);
        // Get children of selected one;
        let id = parseInt(value);
        let selectedItem = versions.find((item) => item.id === id);
        if (selectedItem) {
            let children = SelectDefaultChildren(selectedItem);
            setSelectedVersion([id, ...children]);
        }
    }

    function handleChange(level: number) {
        return (value: string) => {
            let id = parseInt(value);
            // get start
            let prevVersions = selectedVersion.slice(0, level);
            let tempSelected = [...prevVersions, id];

            let version = GetBottomVersion(versions, tempSelected);
            if (version) {
                // Select default children
                let children = SelectDefaultChildren(version);

                tempSelected = [...tempSelected, ...children];
            }
            setSelectedVersion(tempSelected);
            form?.setValue("version", tempSelected)
        };
    }

    useEffect(() => {
        if (selectedVersion.length === 0 && versions.length > 0) {
            let versionsSelection = [versions[0].id];
            versionsSelection = [...versionsSelection, ...SelectDefaultChildren(versions[0])];
            setSelectedVersion(versionsSelection);
            setSelectedTab(versions[0].id.toString())
        }

        return () => {

        }
    }, [versions])



    let sizeController = useController({
        name: "sizeId",
        control: form?.control
    })

    let orientationController = useController({
        name: "orientation",
        control: form?.control
    })

    let secondLevel = getVersion(versions, selectedVersion, 2);
    let thirdLevel = getVersion(versions, selectedVersion, 3);
    let currentVersion = GetBottomVersion(versions, selectedVersion);



    return (
        <div>
            <TabContext value={selectedTab}>
                <Box sx={{ borderBottom: 1, borderColor: "divider", fontSize: "14px" }}>
                    <CustomTabs
                        value={selectedTab}
                        onChange={handleTabChange}
                        aria-label="basic tabs example"
                    >
                        {versions.map((item) => (
                            <CustomTab
                                label={item.name}
                                value={item.id.toString()}
                                sx={{ fontSize: "10px", padding: "4px" }}
                            />
                        ))}
                    </CustomTabs>
                </Box>

                {versions.map((topVersion, index) => {
                    let selectedItem = selectedVersion.length >= 2 && selectedVersion[1];
                    return (
                        <TabPanel value={topVersion.id.toString()} sx={{
                            padding: "5px 0"
                        }}>
                            {topVersion.children.length > 0 && (
                                <>
                                    Выберите тип постера
                                    <ThemesContainer>
                                        {topVersion.children.map((child) => {
                                            let isSelected = selectedItem === child.id;
                                            return (
                                                <ThemeItem
                                                    className={isSelected ? "active" : ""}
                                                    onClick={() => handleChange(1)(child.id.toString())}
                                                >
                                                    <div className="logo">
                                                        <ThemeImage src={child.image} alt="" />
                                                    </div>
                                                    <div className="description">{child.name}</div>
                                                </ThemeItem>
                                            );
                                        })}
                                    </ThemesContainer>
                                    {secondLevel && secondLevel.children.length > 0 && (
                                        <>
                                            Level 2
                                            <SizesContainer>
                                                {secondLevel.children.map((item) => {
                                                    let isSelected = selectedVersion[2] === item.id;
                                                    return (
                                                        <SizeButton
                                                            className={isSelected ? "active" : ""}
                                                            onClick={() =>
                                                                handleChange(2)(item.id.toString())
                                                            }
                                                        >
                                                            {item.name}
                                                        </SizeButton>
                                                    );
                                                })}
                                            </SizesContainer>
                                        </>
                                    )}
                                    {thirdLevel && thirdLevel.children.length > 0 && (
                                        <>
                                            Level 3
                                            <SizesContainer>
                                                {thirdLevel.children.map((item) => {
                                                    let isSelected = selectedVersion[3] === item.id;
                                                    return (
                                                        <SizeButton
                                                            className={isSelected ? "active" : ""}
                                                            onClick={() =>
                                                                handleChange(3)(item.id.toString())
                                                            }
                                                        >
                                                            {item.name}
                                                        </SizeButton>
                                                    );
                                                })}
                                            </SizesContainer>
                                        </>
                                    )}
                                </>
                            )}

                            {currentVersion && currentVersion.sizes.length > 0 && (
                                <>
                                    Выберите размер
                                    <SizesContainer>
                                        {currentVersion.sizes.map((size) => {
                                            let isSelected = sizeController.field.value === size.id;
                                            return (
                                                <SizeButton
                                                    className={isSelected ? "active" : ""}
                                                    onClick={() => sizeController.field.onChange(size.id)}
                                                >
                                                    {size.name}
                                                </SizeButton>
                                            );
                                        })}
                                    </SizesContainer>
                                </>
                            )}

                            {currentVersion && currentVersion.sizes.length > 0 && (
                                <>
                                    Выберите ориентацию.
                                    <SizesContainer>
                                        <SizeButton className={orientationController.field.value === "landscape" ? "active" : ""} onClick={() => { orientationController.field.onChange("landscape") }}>Горизонтальная</SizeButton>
                                        <SizeButton className={orientationController.field.value === "portrait" ? "active" : ""} onClick={() => { orientationController.field.onChange("portrait") }}>Вертикальная</SizeButton>

                                    </SizesContainer>
                                </>
                            )}

                            {currentVersion && currentVersion?.image && <VersionImage src={currentVersion.image} />}
                        </TabPanel>
                    );
                })}
            </TabContext>
        </div>
    );
}
const VersionImage = styled.img`
    margin: 0 auto;
`;

const SizesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const SizeButton = styled.div`
  display: block;
  background: #f3f3f3;
  padding: 9px;
  text-align: center;
  cursor: pointer;
  color: #3f557f;
  margin: 9px 0;
  flex-basis: 33%;
  max-width: 150px;

  &.active {
    color: #ffffff;
    background: #818fab;
  }
`;

const ThemesContainer = styled("div")(({ theme }) => {
    return {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyItems: "center",
    };
});

const ThemeItem = styled("div")(({ theme }) => {
    return {
        flexBasis: "24%",
        cursor: "pointer",
        padding: "20px 0",
        "& .logo": {
            width: "54px",
            height: "64px",
            margin: "0 auto",
            background: "#F3F3F3",
        },
        "& .description": {
            fontSize: "10px",
            lineHeight: "12px",

            color: "#3F557F",
            padding: "5px",
            textAlign: "center",
        },

        "&.active ": {
            "& .logo": {
                background: "#818FAB",
            },

            "& .description": {
                fontWeight: 700,
            },
        },
    };
});

const ThemeImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
