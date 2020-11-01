class CRUD {
  constructor (model) {
    this.Model = model
  }

  setObj (obj) {
    return new this.Model(obj)
  }

  /**
   * 增加
   * @returns {Promise<any>}
   */
  async insertMethod (obj) {
    return await this.setObj(obj).save()
  }

  /**
   * 删除数据
   * @param target 要删除的目标
   * @returns {Promise<*>}
   */
  async deleteMethod (target) {
    return await this.model.deleteOne(target)
  }

  /**
   *
   * @param target 需要修改数据的对象: {name: 'andy'}
   * @param update 需要更新的数据: {email: 'abc@test.com}
   * @returns {Promise<*>}
   */
  async updateMethod (target, update) {
    return await this.model.updateOne(target, update)
  }

  /**
   * 查询
   * @returns {Promise<*>}
   */
  async findMethod () {
    return await this.model.find()
  }

  async findOneMethod (target) {
    return this.model.findOne(target)
  }
}

export default CRUD
