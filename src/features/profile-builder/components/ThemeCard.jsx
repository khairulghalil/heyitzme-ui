import { useEffect } from "react";
import { Accordion, Form, Dropdown } from "react-bootstrap";
import { ProBadge, PremiumBadge } from "../../../components/badge";
import { fontFamily } from "../../../constants";

function ThemeCard({
  builderProfile,
  handleChange,
  onPlanChange,
  bannerThumbnail = [],
  handleBannerSelect,
  bannerInputRef,
  handleBannerFileChange,
  logoInputRef,
  handleLogoFileChange,
  showThemeList = false,
  setShowThemeList,
}) {
  const isCustomBanner =
    !!builderProfile?.bannerBg &&
    !builderProfile.bannerBg.startsWith("banners/default/");

  const currentPlan = builderProfile?.plan;

  useEffect(() => {
    const selectedFont = fontFamily.find(
      (font) => font.value === builderProfile?.theme?.fontFamily,
    );

    let updatedTier = "basic";
    if (selectedFont?.plan === "pro" || builderProfile?.theme?.logoEnable) {
      updatedTier = "pro";
    }
    if (
      selectedFont?.plan === "premium" ||
      builderProfile?.theme?.verifiedEnable
    ) {
      updatedTier = "premium";
    }

    const selectedTier = updatedTier;

    onPlanChange?.(selectedTier);
  }, [
    builderProfile?.theme?.fontFamily,
    builderProfile?.theme?.logoEnable,
    builderProfile?.theme?.verifiedEnable,
    onPlanChange,
  ]);

  return (
    <Accordion defaultActiveKey={showThemeList ? "1" : "0"} className="mb-3">
      <Accordion.Item eventKey="1">
        <Accordion.Header onClick={() => setShowThemeList(!showThemeList)}>
          Appearance
        </Accordion.Header>
        <Accordion.Body>
          <Form.Group className="mb-3" controlId="primaryColor">
            <div className="d-flex align-items-center justify-content-between">
              <Form.Label className="mb-0">Primary Color</Form.Label>
              <Form.Control
                type="color"
                value={builderProfile?.theme?.primaryColor || "#FFA01A"}
                onChange={handleChange}
                name="theme.primaryColor"
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="secondaryColor">
            <div className="d-flex align-items-center justify-content-between">
              <Form.Label className="mb-0">Secondary Color</Form.Label>
              <Form.Control
                type="color"
                value={builderProfile?.theme?.secondaryColor || "#FDD7A3"}
                onChange={handleChange}
                name="theme.secondaryColor"
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="backgroundColor">
            <div className="d-flex align-items-center justify-content-between">
              <Form.Label className="mb-0">Background Color</Form.Label>
              <Form.Control
                type="color"
                value={builderProfile?.theme?.backgroundColor || "#FFFFFF"}
                onChange={handleChange}
                name="theme.backgroundColor"
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="fontColor">
            <div className="d-flex align-items-center justify-content-between">
              <Form.Label className="mb-0">Font Color</Form.Label>
              <Form.Control
                type="color"
                value={builderProfile?.theme?.fontColor || "#9e9e9e"}
                onChange={handleChange}
                name="theme.fontColor"
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="fontFamily">
            <div className="d-flex align-items-center justify-content-between">
              <label className="mb-0">Font</label>

              <Dropdown>
                <Dropdown.Toggle className="text-end" variant="light">
                  {fontFamily.find(
                    (font) => font.value === builderProfile?.theme?.fontFamily,
                  )?.name || "Afacad"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {fontFamily.map((font) => (
                    <Dropdown.Item
                      key={font.value}
                      style={{ fontFamily: font.value }}
                      onClick={() =>
                        handleChange({
                          target: {
                            name: "theme.fontFamily",
                            value: font.value,
                          },
                        })
                      }
                    >
                      {font.name}
                      {currentPlan === "basic" && font.plan === "pro" && (
                        <ProBadge />
                      )}
                      {currentPlan !== "premium" && font.plan === "premium" && (
                        <PremiumBadge />
                      )}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Banner</Form.Label>
            <div className="banner-options">
              {bannerThumbnail.map((banner) => (
                <button
                  key={banner.path}
                  type="button"
                  className={`banner-option ${builderProfile?.bannerBg === banner.path && !isCustomBanner ? "active" : ""}`}
                  style={{
                    "--banner-mask": `url(${banner.src})`,
                  }}
                  aria-label={`${banner.name} banner`}
                  title={banner.name}
                  onClick={() => handleBannerSelect(banner)}
                >
                  <span className="banner-option-pattern" aria-hidden="true" />
                  <span>{banner.name}</span>
                </button>
              ))}
              <button
                type="button"
                className={`banner-option banner-upload ${isCustomBanner ? "active" : ""}`}
                style={
                  isCustomBanner
                    ? {
                        backgroundImage: `url(${builderProfile.bannerBlobUrl || `https://images.heyitzme.com/${builderProfile.bannerBg}?v=${builderProfile.bannerBgVer}`})`,
                      }
                    : undefined
                }
                aria-label="Upload custom banner"
                onClick={() => bannerInputRef.current?.click()}
              >
                <i className="bi bi-camera-fill"></i>
                <span>
                  {builderProfile?.bannerBgCustom ? "Custom" : "Upload"}
                </span>
              </button>
              <input
                type="file"
                accept="image/*"
                ref={bannerInputRef}
                className="d-none"
                onChange={handleBannerFileChange}
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <Form.Label className="mb-0">
                Logo {currentPlan === "basic" && <ProBadge />}
              </Form.Label>
              <Form.Check
                type="switch"
                id="logo-toggle"
                name="theme.logoEnable"
                checked={builderProfile?.theme?.logoEnable || false}
                onChange={handleChange}
                className="text-end"
              />
            </div>
            <div
              className={`banner-options mb-4 logo-options ${builderProfile?.theme?.logoEnable ? "" : "d-none"}`}
            >
              <button
                type="button"
                className={`banner-option banner-upload ${builderProfile?.logoImage ? "active" : ""}`}
                style={
                  builderProfile?.logoImage
                    ? {
                        backgroundImage: `url(${builderProfile.logoBlobUrl || `https://images.heyitzme.com/${builderProfile.logoImage}?v=${builderProfile.logoImageVer}`})`,
                      }
                    : undefined
                }
                aria-label="Upload logo"
                onClick={() => logoInputRef.current?.click()}
              >
                <i className="bi bi-camera-fill"></i>
                <span>{builderProfile?.logoImage ? "Custom" : "Upload"}</span>
              </button>
              <input
                type="file"
                accept="image/*"
                ref={logoInputRef}
                className="d-none"
                onChange={handleLogoFileChange}
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-1">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <Form.Label className="mb-0">
                Verified Badge {currentPlan !== "premium" && <PremiumBadge />}
              </Form.Label>
              <Form.Check
                type="switch"
                name="theme.verifiedEnable"
                checked={builderProfile?.theme?.verifiedEnable || false}
                onChange={handleChange}
                className="text-end"
              />
            </div>
          </Form.Group>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default ThemeCard;
