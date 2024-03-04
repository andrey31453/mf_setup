export const bootstrap = async (cb: Function) =>
	await new Promise((res, rej): void => {
		try {
			cb()
			res('Произвелась предзапись конфигурации')
		} catch (e) {
			rej(`Не произвелась предзапись конфигурации: , ${e}`)
		}
	})
