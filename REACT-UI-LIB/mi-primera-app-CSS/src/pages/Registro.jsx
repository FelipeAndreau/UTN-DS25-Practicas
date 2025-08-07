import '../App.css';

const Registro = () => {
    return (
        <div className="form">
            <form>
                <div className="name">
                    <label>
                        Nombre <br />
                        <input type="text" placeholder="Fabri" />
                    </label>
                </div>

                <div className="surname">
                    <label>
                        Apellido <br />
                        <input type="text" placeholder="Pérez" />
                    </label>
                </div>

                <div className="password">
                    <label>
                        Contraseña <br />
                        <input type="password" placeholder="********" />
                    </label>
                </div>

                <div className="sex">
                    <label>
                        Sexo <br />
                        <span>
                            <input type="radio" name="sexo" value="masculino" /> Masculino
                            <input type="radio" name="sexo" value="femenino" /> Femenino
                        </span>
                    </label>
                </div>

                <div className="tema_fav">
                    <label>
                        Tema Favorito <br />
                        <select>
                            <option value="op_1">Novela</option>
                            <option value="op_2">Terror</option>
                            <option value="op_3">Ciencia Ficción</option>
                            <option value="op_4">Policial</option>
                        </select>
                    </label>
                </div>

                <div className="enviar">
                    <label>
                        <input type="submit" value="ENVIAR" />
                    </label>
                </div>
            </form>
        </div>
    );
};

export default Registro;