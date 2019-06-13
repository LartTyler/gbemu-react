export enum LcdControl {
	/**
	 * This bit controls whether or not the LCD is on. Resetting this bit grants full access to VRAM, OAM, etc., but
	 * can only be altered during VBLANK. Changing this bit outside of VBLANK was known to damage the hardware.
	 *
	 * @see http://gbdev.gg8.se/wiki/articles/LCDC#LCDC.7_-_LCD_Display_Enable
	 */
	LCD_ENABLED = 0x80,

	/**
	 * This bit indicates which background map the window should use for rendering.
	 *        Reset (0) = $9800 - $9BFF
	 *        Set   (1) = $9C00 - $9FFF
	 *
	 * @see http://gbdev.gg8.se/wiki/articles/LCDC#LCDC.6_-_Window_Tile_Map_Display_Select
	 */
	WINDOW_TILE_CONTROL = 0x40,

	/**
	 * This bit controls whether the window should be displayed. In DMG (Gameboy Classic) mode, this can be overridden
	 * by {@see BG_WINDOW_CONTROL}.
	 *
	 * @see http://gbdev.gg8.se/wiki/articles/LCDC#LCDC.5_-_Window_Display_Enable
	 */
	WINDOW_ENABLED = 0x20,

	/**
	 * This bit controls the addressing mode used by the BG and window to locate tiles.
	 *        Reset (0) = $8800 - $97FF, signed addressing (-128 to 127)
	 *        Set   (1) = $8000 - $8FFF, unsigned addressing (0 to 255).
	 *
	 * @see http://gbdev.gg8.se/wiki/articles/LCDC#LCDC.4_-_BG_.26_Window_Tile_Data_Select
	 */
	BG_WINDOW_ADDRESS_MODE = 0x10,

	/**
	 * This bit works similarly to {@see WINDOW_TILE_CONTROL}, except that it changes where the BG searches for tiles.
	 *        Reset (0) = $9800 - $9BFF
	 *        Set   (1) = $9C00 - $9FFF
	 *
	 * @see http://gbdev.gg8.se/wiki/articles/LCDC#LCDC.3_-_BG_Tile_Map_Display_Select
	 */
	BG_TILE_CONTROL = 0x08,

	/**
	 * This bit controls the size of the foreground sprites.
	 *        Reset (0) = 8x8
	 *        Set   (1) = 8x16, stacked vertically
	 *
	 * @see http://gbdev.gg8.se/wiki/articles/LCDC#LCDC.2_-_OBJ_Size
	 */
	SPRITE_SIZE = 0x04,

	/**
	 * This bit controls whether sprites (foreground) should be displayed. Can be toggled mid-frame to stop sprites
	 * from being rendered on top of something else.
	 *
	 * @see http://gbdev.gg8.se/wiki/articles/LCDC#LCDC.1_-_OBJ_Display_Enable
	 */
	SPRITES_ENABLED = 0x02,

	/**
	 * This bit controls different behavior, depending on which mode the hardware is running in.
	 *
	 * DMG (Gameboy Classic / monochrome) mode
	 *        When reset, both the window and background become blank (white), and the value of {@see WINDOW_ENABLED} is
	 *        ignored. Only sprites will be rendered (if {@see SPRITES_ENABLED} is set.
	 *
	 * CGB (Gameboy Color) mode:
	 *        When reset, the window and background lose their priority, causing sprites to always be rendered on top of
	 *        the window / background, regardless of the value of the priority flags in OAM / BG map attributes.
	 *
	 * @see http://gbdev.gg8.se/wiki/articles/LCDC#LCDC.0_-_BG.2FWindow_Display.2FPriority
	 */
	BG_WINDOW_CONTROL = 0x01,
}
